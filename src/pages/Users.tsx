import useUserListQuery from "../queries/users/listing";
import useAuthStore from "../stores/authStore";

export function Users() {
    const userData = useAuthStore((state) => state.userData);
    const {isLoading} = useUserListQuery({
        token: userData.token
    })
    if (isLoading) return <p>Loading users...</p>
    return (
        <>
            {/*{data.map(user => <p>{user.name}</p>)}*/}
        </>
    )
}