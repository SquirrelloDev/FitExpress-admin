import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z, ZodString} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {dateErrorMap, selectErrorMap} from "../users/create";
import {imageSizeValidator, imageValidator} from "../../utils/imageValidator";

export const fixedSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    meals: z.record(z.string().min(1), z.array(z.string()).min(5))
})
export type FixedSchema = z.infer<typeof fixedSchema>
export type FixedPostData = FixedSchema & {
    token: string
}
export type FixedError = AxiosError<{ errors: { general: string } }>
export type FixedResponse = { message: string }
const createDayFixed: MutationFunction<FixedResponse, FixedPostData> = async (dayFixed) => {
    const dietsMealsArr = Object.keys(dayFixed.meals).map(key => {
        return {
            diet_id: key,
            meals: {
                morning: dayFixed.meals[key][0],
                lunch: dayFixed.meals[key][1],
                dinner: dayFixed.meals[key][2],
                teatime: dayFixed.meals[key][3],
                supper: dayFixed.meals[key][4],
            }
        }
    })
    const postObj = {
        date: dayFixed.date,
        diets: dietsMealsArr
    }
    const res = await FitExpressClient.getInstance().post<FixedResponse, FixedError>(apiRoutes.ADD_FIXED, postObj, {headers: {Authorization: `Bearer ${dayFixed.token}`}})
    if (res.response?.status && res.response?.status !== 201) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDayFixedCreate() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<FixedResponse, FixedError, FixedPostData>(['Fixed-Create'], createDayFixed, {
        onSuccess: () => {
            toast.success('Dzień Fixed dodany!');
            queryClient.invalidateQueries(['FixedsList'])
            navigate(appRoutes.fixedDays);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDayFixedCreate
