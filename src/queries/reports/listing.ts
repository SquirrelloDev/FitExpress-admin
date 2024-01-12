import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Report} from "../../types/dbtypes/Report";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}

type AuthParams = {
    token: string,
}
type OneAuthParams = {
    token: string,
    id: string
}
const userPartialKey = 'ReportsList'
type ReportsListKey = [typeof userPartialKey, AuthParams]

interface ReportsResponse {
    reports: Report[]
    paginationInfo: paginationInfo
}

const oneReportPartialKey = 'ReportList'
type OneReportListKey = [typeof oneReportPartialKey, OneAuthParams]

interface OneReportResponse {
    report: Report
}

const listReports: QueryFunction<ReportsResponse, ReportsListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<ReportsResponse>(apiRoutes.GET_REPORTS(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as ReportsResponse
}
const listOneReport: QueryFunction<OneReportResponse, OneReportListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneReportResponse>(apiRoutes.GET_REPORT_ID(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {report: res.data as unknown} as OneReportResponse
}

function useReportsListQuery(params: AuthParams) {
    const queryKey = ['ReportsList', params] as ReportsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listReports, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneReportListQuery(params: OneAuthParams){
    const queryKey = ['ReportList', params] as OneReportListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneReport
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useReportsListQuery