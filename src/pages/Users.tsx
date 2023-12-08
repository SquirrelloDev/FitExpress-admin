import useUserListQuery from "../queries/users/listing";
import useAuthStore from "../stores/authStore";
import Table from "../components/Table/Table";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {UserFullData} from "../types/dbtypes/UserData";
import {UserRole} from "../utils/userRoles";
import RowActions from "../components/Table/RowActions";
import useTableListing from "../hooks/useTableListing";
import {TableListingType} from "../types/table/tableListing";
import Modal from "../components/Modal/Modal";

export function Users() {
    const columnHelper = createColumnHelper<UserFullData>()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useUserListQuery({
        token: userData.token
    })
    const columns = [
        columnHelper.accessor('name', {
            header: 'Nazwa użytkownika',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('email', {
            header: 'E-mail',
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
                const date = new Date(getValue())
                return <p>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            }
        })
    ]

    const {users} = useMemo(() => ({
        users: isSuccess ? data!.users : []
    }), [data, isSuccess])
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    const polishTableName = useTableListing(TableListingType.users);

    if (isLoading) return <p>Loading users...</p>
    return (
        <>
            <Table headerGroups={table.getHeaderGroups()}
                   rows={table.getRowModel().rows}
                   isLoading={isLoading}
                   tableName={polishTableName}/>
            {modalOpen && <Modal>test</Modal>}
        </>
    )
}