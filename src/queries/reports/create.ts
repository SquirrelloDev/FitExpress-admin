import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {dateErrorMap, selectErrorMap} from "../users/create";

export const reportSchema = z.object({
    category: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    userId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    orderId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    deliveryDate: z.coerce.date({errorMap: dateErrorMap}),
    message: z.string().min(1, errorMessages.required),
})
export type ReportSchema = z.infer<typeof reportSchema>
export type ReportPostData = {
    report:{
        orderId: string,
        userId: string,
        deliveryDate: Date,
        category: string,
        message:string
    }
    token: string
}
export type ReportError = AxiosError<{errors: {general: string}}>
export type ReportResponse = {message: string}
const createReport:MutationFunction<ReportResponse, ReportPostData> = async (report) => {
    const res = await FitExpressClient.getInstance().post<ReportResponse, ReportError>(apiRoutes.ADD_REPORT, {
        ...report.report
    }, {headers: {Authorization: `Bearer ${report.token}`}})
    if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useReportCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<ReportResponse, ReportError, ReportPostData>(['Report-Create'], createReport, {onSuccess: () => {
            toast.success('Zgłoszenie dodane!');
            queryClient.invalidateQueries(['ReportsList'])
            navigate(appRoutes.reports);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useReportCreate
