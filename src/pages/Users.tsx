import useUserListQuery from "../queries/users/listing";
import useAuthStore from "../stores/authStore";
import Table from "../components/Table/Table";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo} from "react";
import {UserFullData} from "../types/dbtypes/UserData";
import {UserRole} from "../utils/userRoles";
import RowActions from "../components/Table/RowActions";
const columnHelper = createColumnHelper<UserFullData>()
const columns = [
    columnHelper.accessor('name', {
        header: 'Nazwa użytkownika',
        cell: ({getValue}) => <p>{getValue()}</p>
    }),
    columnHelper.accessor('role', {
        header: 'Rola',
        cell: ({getValue}) => {
            const enumVal = getValue()
            return <p>{UserRole[enumVal]}</p>
        }
    }),
    columnHelper.accessor('birth_date', {
        header: 'Data ur.',
        cell: ({getValue}) => {
            const date = getValue() as Date
            return <p>{date.toLocaleString()}</p>
        }
    }),
    columnHelper.display({id: 'actions', header: 'Akcje', cell: (props) => <RowActions row={props.row} />})
]
export function Users() {
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useUserListQuery({
        token: userData.token
    })
    const {users} = useMemo(() =>({
        users: isSuccess ? data?.users: []
    }), [data, isSuccess])
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    if (isLoading) return <p>Loading users...</p>
    return (
        <>
            <Table headerGroups={table.getHeaderGroups()}
            rows={table.getRowModel().rows}
            isLoading={isLoading}/>
        </>
    )
}