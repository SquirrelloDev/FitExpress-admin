import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z, ZodString} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {selectErrorMap} from "../users/create";
import {imageSizeValidator, imageValidator} from "../../utils/imageValidator";

export const mealSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    tagsId: z.array(z.string({errorMap: selectErrorMap})).optional(),
    exclusions: z.array(z.string({errorMap: selectErrorMap})).optional(),
    description: z.string().min(1, errorMessages.required),
    ingredients: z.string().min(1, errorMessages.required),
    image: z.custom<FileList>().optional(),
    calories: z.coerce.number().min(1, errorMessages.required),
    carbs: z.coerce.number().min(0, errorMessages.required),
    fats: z.coerce.number().min(0, errorMessages.required),
    proteins: z.coerce.number().min(0, errorMessages.required),
    salt: z.coerce.number().min(0, errorMessages.required),
})
    .refine(imageSizeValidator, {
        path: ['image'],
        message: 'Rozmiar pliku musi być mniejszy niż 5MB'
    })
export type MealSchema = z.infer<typeof mealSchema>
export type MealPostData = MealSchema & {
    token: string
}
export type MealError = AxiosError<{ errors: { general: string } }>
export type MealResponse = { message: string }
const createMeal: MutationFunction<MealResponse, MealPostData> = async (meal) => {
    const formData = new FormData();
    const dataObj = {
        name: meal.name,
        description: meal.description,
        tagsId: meal.tagsId,
        exclusions: meal.exclusions,
        ingredients: meal.ingredients.split(','),
        nutritionValues: {
            calories: meal.calories,
            carbs: meal.carbs,
            fats: meal.fats,
            proteins: meal.proteins,
            salt: meal.salt,
        }
    }
    const dataObjText = JSON.stringify(dataObj);
    formData.append('data', dataObjText)
    if(meal.image?.length > 0){
        formData.append('image', meal.image?.item(0))
    }
    const res = await FitExpressClient.getInstance().post<MealResponse, MealError>(apiRoutes.ADD_MEAL, formData, {headers: {'Content-Type': "multipart/form-data", Authorization: `Bearer ${meal.token}`}})
    if (res.response?.status && res.response?.status !== 201) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useMealCreate() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<MealResponse, MealError, MealPostData>(['Meal-Create'], createMeal, {
        onSuccess: () => {
            toast.success('Posiłek dodany!');
            queryClient.invalidateQueries(['MealsList'])
            navigate(appRoutes.meals);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useMealCreate
