import useUserListQuery from "../../queries/users/listing";
import useAuthStore from "../../stores/authStore";
import Table from "../../components/Table/Table";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {UserFullData} from "../../types/dbtypes/UserData";
import {UserRole} from "../../utils/userRoles";
import RowActions from "../../components/Table/RowActions";
import useTableListing from "../../hooks/useTableListing";
import {TableListingType} from "../../types/table/tableListing";
import Modal from "../../components/Modal/Modal";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import useUserDelete from "../../queries/users/delete";
import {ModalType} from "../../types/table/modalType";
import UserDetails from "../../components/Modal/Views/UserDetails";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";

function Users() {
    const columnHelper = createColumnHelper<UserFullData>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{isOpen: boolean, modalType: ModalType}>({isOpen: false, modalType: ModalType.none});
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useUserListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
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
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.users} setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {mutate} = useUserDelete()
    const deleteUser = () =>{
        mutate({id: itemId, token: userData.token}, {onSuccess: () => {
                setItemId("")
                setModalOpen({isOpen: false, modalType: ModalType.none})
            }})
    }
    const {users, pageCount} = useMemo(() => ({
        users: isSuccess ? data!.users : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.users);

    if (isLoading) return <Grid />
    return (
        <>
            <Table headerGroups={table.getHeaderGroups()}
                   rows={table.getRowModel().rows}
                   isLoading={isLoading}
                   tableName={polishTableName}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}
             tableListing={TableListingType.users}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteUser}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details && <Modal><UserDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
        </>
    )
}
export default Users