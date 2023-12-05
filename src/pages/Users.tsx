import useUserListQuery from "../queries/users/listing";
import useAuthStore from "../stores/authStore";
import Table from "../components/Table/Table";

export function Users() {
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useUserListQuery({
        token: userData.token
    })
    if (isLoading) return <p>Loading users...</p>
    return (
        <>
            <Table data={data?.users}></Table>
        </>
    )
}