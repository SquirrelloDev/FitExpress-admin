import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {FixedError, FixedPostData, FixedResponse,} from "./create";

export type FixedPutData = FixedPostData & { id: string }
const updateDayFixed: MutationFunction<FixedResponse, FixedPutData> = async (dayFixed) => {
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
    const res = await FitExpressClient.getInstance().put<FixedResponse, FixedError>(apiRoutes.EDIT_FIXED(dayFixed.id), postObj,
        {headers: { Authorization: `Bearer ${dayFixed.token}`}})
    if (res.response?.status && res.response?.status !== 200) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDayFixedEdit() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<FixedResponse, FixedError, FixedPutData>(['Fixed-Update'], updateDayFixed, {
        onSuccess: () => {
            toast.success('Dzień Fixed zedytowany!');
            queryClient.invalidateQueries(['FixedsList'])
            queryClient.invalidateQueries(['FixedList'])
            navigate(appRoutes.fixedDays);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDayFixedEdit