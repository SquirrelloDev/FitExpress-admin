import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {DietError, DietPostData, DietResponse,} from "./create";

export type DietPutData = DietPostData & { id: string }
const updateDiet: MutationFunction<DietResponse, DietPutData> = async (diet) => {
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
    if (diet.image && diet.image!.length > 0) {
        formData.append('image', diet.image!.item(0) as Blob)
    }
    const res = await FitExpressClient.getInstance().put<DietResponse, DietError>(apiRoutes.EDIT_DIET(diet.id), formData,
        {headers: {'Content-Type': "multipart/form-data", Authorization: `Bearer ${diet.token}`}})
    if (res.response?.status && res.response?.status !== 200) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}

function useDietEdit() {
    const navigate = useNavigate();
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<DietResponse, DietError, DietPutData>(['Diet-Update'], updateDiet, {
        onSuccess: () => {
            toast.success('Dieta zedytowana!');
            queryClient.invalidateQueries(['DietsList'])
            queryClient.invalidateQueries(['DietList'])
            navigate(appRoutes.diets);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}

export default useDietEdit