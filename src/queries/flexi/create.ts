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

export const flexiSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    meals: z.record(z.string().min(1), z.array(z.string()).min(6))
})
export type FlexiSchema = z.infer<typeof flexiSchema>
export type FlexiPostData = FlexiSchema & {
    token: string
}
export type FlexiError = AxiosError<{ errors: { general: string } }>
export type FlexiResponse = { message: string }
const createDayFlexi: MutationFunction<FlexiResponse, FlexiPostData> = async (dayFlexi) => {
    const postObj = {
        date: dayFlexi.date,
        morningMeals: dayFlexi.meals.morning,
        lunchMeals: dayFlexi.meals.lunch,
        dinnerMeals: dayFlexi.meals.dinner,
        teatimeMeals: dayFlexi.meals.teatime,
        supperMeals: dayFlexi.meals.supper,

    }
    const res = await FitExpressClient.getInstance().post<FlexiResponse, FlexiError>(apiRoutes.ADD_FLEXI, postObj, {headers: {Authorization: `Bearer ${dayFlexi.token}`}})
    if (res.response?.status && res.response?.status !== 201) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDayFlexiCreate() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<FlexiResponse, FlexiError, FlexiPostData>(['Flexi-Create'], createDayFlexi, {
        onSuccess: () => {
            toast.success('Dzień Flexi dodany!');
            queryClient.invalidateQueries(['FlexisList'])
            navigate(appRoutes.flexiDays);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDayFlexiCreate
