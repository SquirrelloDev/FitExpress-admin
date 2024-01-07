import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {
    FlexiResponse,
    FlexiError,
    FlexiPostData,
} from "./create";

export type FlexiPutData = FlexiPostData & { id: string }
const updateDayFlexi: MutationFunction<FlexiResponse, FlexiPutData> = async (dayFlexi) => {
    const postObj = {
        date: dayFlexi.date,
        morningMeals: dayFlexi.meals.morning,
        lunchMeals: dayFlexi.meals.lunch,
        dinnerMeals: dayFlexi.meals.dinner,
        teatimeMeals: dayFlexi.meals.teatime,
        supperMeals: dayFlexi.meals.supper,

    }
    const res = await FitExpressClient.getInstance().put<FlexiResponse, FlexiError>(apiRoutes.EDIT_FLEXI(dayFlexi.id), postObj,
        {headers: { Authorization: `Bearer ${dayFlexi.token}`}})
    if (res.response?.status && res.response?.status !== 200) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDayFlexiEdit() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<FlexiResponse, FlexiError, FlexiPutData>(['Flexi-Update'], updateDayFlexi, {
        onSuccess: () => {
            toast.success('Dzień Flexi zedytowany!');
            queryClient.invalidateQueries(['FlexisList'])
            queryClient.invalidateQueries(['FlexiList'])
            navigate(appRoutes.flexiDays);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDayFlexiEdit