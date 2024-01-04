import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {HealthData} from "../../types/dbtypes/HealthData";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const dateErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_date) {
        return { message: errorMessages.required }
    }
    return null
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const selectErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_type) {
        return { message: errorMessages.required }
    }
    return null
}
export const userSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    email: z.string().email(errorMessages.invalidMail),
    password: z.string().min(8, errorMessages.shortPasswd(8)),
    birth_date: z.coerce.date({errorMap: dateErrorMap}),
    role: z.coerce.number({errorMap: selectErrorMap}),
    user_height: z.coerce.number().min(120, errorMessages.minMax(120, 250)).max(250,errorMessages.minMax(120, 250)),
    user_weight_current: z.coerce.number().min(40, errorMessages.minMax(40, 500)).max(500, errorMessages.minMax(40, 500)),
    user_weight_planned: z.coerce.number().min(40, errorMessages.minMax(40, 500)).max(500, errorMessages.minMax(40, 500)),
    gender: z.string({errorMap: selectErrorMap}),
    pal_active: z.number({errorMap: selectErrorMap}),
    pal_passive: z.number({errorMap: selectErrorMap}),
    user_goal: z.string({errorMap: selectErrorMap})

})
export type UserSchema = z.infer<typeof userSchema>
export type UserPostData = {
    name: string,
    email: string,
    password: string,
    role: number,
    birth_date: Date,
    healthData: HealthData
}
export type UserError = AxiosError<{errors: {general: string}}>
export type UserResponse = {message: string}
const createUser:MutationFunction<UserResponse, UserPostData> = async (user) => {
    const res = await FitExpressClient.getInstance().post<UserResponse, UserError>(apiRoutes.ADD_USER, {
        ...user
    }, {headers: {'Content-Type': "application/json"}})
    console.log(res.response?.status === 409);
    if(res.response?.status === 409){
        throw new Error('User istnieje!');
    }
    else if(res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useUserCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<UserResponse, UserError, UserPostData>(['User-Create'], createUser, {onSuccess: () => {
            toast.success('Użytkownik stworzony!');
            navigate(appRoutes.users);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useUserCreate
