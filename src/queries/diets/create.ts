import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {selectErrorMap} from "../users/create";
import {imageSizeValidator} from "../../utils/imageValidator";

export const dietSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    dietType: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    tagsId: z.array(z.string({errorMap: selectErrorMap})).optional(),
    exclusions: z.array(z.string({errorMap: selectErrorMap})).optional(),
    shortDesc: z.string().min(1, errorMessages.required),
    longDesc: z.string().min(1, errorMessages.required),
    basicInfo: z.string().min(1, errorMessages.required),
    image: z.custom<FileList>().optional(),
    kcal1500: z.coerce.number().min(1, errorMessages.required),
    kcal1800: z.coerce.number().min(1, errorMessages.required),
    kcal2000: z.coerce.number().min(1, errorMessages.required),
    kcal2200: z.coerce.number().min(1, errorMessages.required),
    kcal2500: z.coerce.number().min(1, errorMessages.required),
    kcal2800: z.coerce.number().min(1, errorMessages.required),
})
    .refine(imageSizeValidator, {
        path: ['image'],
        message: 'Rozmiar pliku musi być mniejszy niż 5MB'
    })
export type DietSchema = z.infer<typeof dietSchema>
export type DietPostData = DietSchema & {
    token: string
}
export type DietError = AxiosError<{ errors: { general: string } }>
export type DietResponse = { message: string }
const createDiet: MutationFunction<DietResponse, DietPostData> = async (diet) => {
    const formData = new FormData();
    const dataObj = {
        name: diet.name,
        dietType: diet.dietType,
        shortDesc: diet.shortDesc,
        longDesc: diet.longDesc,
        basicInfo: diet.basicInfo.split(','),
        exclusions: diet.exclusions,
        tags_id: diet.tagsId,
        prices: {
            kcal1500: diet.kcal1500,
            kcal1800: diet.kcal1800,
            kcal2000: diet.kcal2000,
            kcal2200: diet.kcal2200,
            kcal2500: diet.kcal2500,
            kcal2800: diet.kcal2800
        }
    }
    const dataObjText = JSON.stringify(dataObj);
    formData.append('data', dataObjText)
    if(diet.image && diet.image!.length > 0){
        formData.append('image', diet.image!.item(0) as Blob)
    }
    const res = await FitExpressClient.getInstance().post<DietResponse, DietError>(apiRoutes.ADD_DIET, formData, {headers: {'Content-Type': "multipart/form-data", Authorization: `Bearer ${diet.token}`}})
    if (res.response?.status && res.response?.status !== 201) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDietCreate() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<DietResponse, DietError, DietPostData>(['Diet-Create'], createDiet, {
        onSuccess: () => {
            toast.success('Dieta dodana!');
            queryClient.invalidateQueries(['DietsList'])
            navigate(appRoutes.diets);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDietCreate
