import {MutationFunction, MutationKey, useMutation} from "@tanstack/react-query";
import {UserData} from "../../types/dbtypes/UserData";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {z} from "zod";

export const LoginFormSchema = z.object({
    email: z.string().min(1, 'required').max(60, 'max 60').email('invalid email'),
    password: z.string().min(8, 'required at least 8 characters')
})
export type LoginFormDataSchema = z.infer<typeof LoginFormSchema>
type LoginResponse = {
    data: UserData
}
export type LoginErrorType = AxiosError<{
    errors: { general: string }
}>
const loginUser: MutationFunction<LoginResponse, LoginFormDataSchema> = async ({email, password}) => {
    const {data} = await FitExpressClient.getInstance().post<LoginResponse>(
        apiRoutes.LOGIN,
        {email, password}
    )

    return {data: data as never}
}
export const mutationKey: MutationKey = ['loginUser']
export type SuccessFunctionMutation<T> = (
    data: LoginResponse,
    variables: T
) => unknown
export type ErrorFunctionMutation = (
    err: LoginErrorType,
    variables: LoginFormDataSchema
) => unknown


function useLoginMutation(
    onSuccess?: SuccessFunctionMutation<LoginFormDataSchema>,
    onError?: ErrorFunctionMutation
) {
    const {
        mutate,
        error,
        isLoading,
        isSuccess,
        reset
    } = useMutation<LoginResponse,LoginErrorType,LoginFormDataSchema>(mutationKey, loginUser, {onSuccess, onError, networkMode: 'always'})
    return {mutate, error, isLoading, isSuccess, reset}
}

export default useLoginMutation