import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {dateErrorMap, selectErrorMap, UserError, UserResponse} from "./create";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
export type UserPutData = {
    user: {
        name: string,
        email: string,
        role: number,
        birth_date: Date
    },
    authInfo: {
        token: string,
        id: string
    }
}
export const userPutSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    email: z.string().email(errorMessages.invalidMail),
    birth_date: z.coerce.date({errorMap: dateErrorMap}),
    role: z.coerce.number({errorMap: selectErrorMap}),
})
export type UserPutSchema = z.infer<typeof userPutSchema>;
const updateUser:MutationFunction<UserResponse, UserPutData> = async (user) => {
    const res = await FitExpressClient.getInstance().put<UserResponse, UserError>(apiRoutes.EDIT_USER(user.authInfo.id), {
        ...user.user
    }, {headers: {'Content-Type': "application/json", Authorization: `Bearer ${user.authInfo.token}`}})
    console.log(res.response?.status)
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useUserEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<UserResponse, UserError, UserPutData>(['User-Update'], updateUser, {onSuccess: () => {
            toast.success('Użytkownik zedytowany!');
            navigate(appRoutes.users);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useUserEdit