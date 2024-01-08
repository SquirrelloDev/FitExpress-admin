import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {MealError, MealPostData, MealResponse,} from "./create";

export type MealPutData = MealPostData & { id: string }
const updateMeal: MutationFunction<MealResponse, MealPutData> = async (meal) => {
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
    if (meal.image?.length > 0) {
        formData.append('image', meal.image?.item(0))
    }
    const res = await FitExpressClient.getInstance().put<MealResponse, MealError>(apiRoutes.EDIT_MEAL(meal.id), formData,
        {headers: {'Content-Type': "multipart/form-data", Authorization: `Bearer ${meal.token}`}})
    if (res.response?.status && res.response?.status !== 200) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useMealEdit() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<MealResponse, MealError, MealPutData>(['Meal-Update'], updateMeal, {
        onSuccess: () => {
            toast.success('Posiłek zedytowany!');
            queryClient.invalidateQueries(['MealsList'])
            queryClient.invalidateQueries(['MealList'])
            navigate(appRoutes.meals);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useMealEdit