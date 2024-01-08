import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {
    AddressError,
    AddressPostData,
    AddressResponse,
    OrderError,
    OrderPostData,
    OrderResponse,
    ReportError,
    ReportPostData,
    ReportResponse, reportSchema,
} from "./create";
import {z} from "zod";
import {dateErrorMap, selectErrorMap} from "../users/create";
import errorMessages from "../../utils/errorMessages";

export const reportPutSchema = z.object({
    category: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    userId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    orderId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    reportStatus: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    deliveryDate: z.coerce.date({errorMap: dateErrorMap}),
    message: z.string().min(1, errorMessages.required),
})
export type ReportPutSchema = z.infer<typeof reportPutSchema>
export type ReportPutData = {
    report:{
        orderId: string,
        userId: string,
        deliveryDate: Date,
        reportStatus: string,
        category: string,
        message:string
    }
    token: string,
    id:string
}
const updateReport:MutationFunction<ReportResponse, ReportPutData> = async (report) => {
    const res = await FitExpressClient.getInstance().put<ReportResponse, ReportError>(apiRoutes.EDIT_REPORT(report.id), {
            ...report.report
    }, {headers: {Authorization: `Bearer ${report.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useReportEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<ReportResponse, ReportError, ReportPutData>(['Report-Update'], updateReport, {onSuccess: () => {
            toast.success('Zgłoszenie zedytowane!');
            queryClient.invalidateQueries(['ReportsList'])
            queryClient.invalidateQueries(['ReportList'])
            navigate(appRoutes.reports);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useReportEdit