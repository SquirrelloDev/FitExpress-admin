import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Modal from "../../components/Modal/Modal";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import {DayFixed} from "../../types/dbtypes/DayFixed";
import useFixedDelete from "../../queries/fixed/delete";
import useFixedListQuery from "../../queries/fixed/listing";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import Table from "../../components/Table/Table";
import FixedDetails from "../../components/Modal/Views/FixedDetails";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";
import calcLowerDate from "../../utils/calcMonth";

function FixedDays() {
    const columnHelper = createColumnHelper<DayFixed>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useFixedListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID dnia',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('date', {
            header: 'Data',
            cell: ({getValue}) => {
                const date = new Date(getValue());
                return <p>{`${calcLowerDate(date.getDate())}-${calcLowerDate(date.getMonth() + 1)}-${date.getFullYear()}`}</p>
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {
                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.dayFixed}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {fixedDays, pageCount} = useMemo(() => ({
        fixedDays: isSuccess ? data!.fixedDays.sort((dayA, dayB) => {
            return (new Date(dayB.date).getTime() - new Date(dayA.date).getTime())
        }) : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        columns,
        data: fixedDays,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.dayFixed);
    const {mutate, isLoading: isDeleting} = useFixedDelete();
    const deleteDay = () => {
        mutate({id: itemId, token: userData.token}, {
            onSuccess: () => {
                setItemId("")
                setModalOpen({isOpen: false, modalType: ModalType.none})
            }
        })
    }
    if (isLoading) return <Grid/>
    return (
        <>
            <Table isLoading={isLoading} tableName={polishTableName} headerGroups={table.getHeaderGroups()}
                   rows={table.getRowModel().rows} tableListing={TableListingType.dayFixed}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details &&
                <Modal><FixedDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete isDeleting={isDeleting} id={itemId} closeModal={setModalOpen} deleteMutation={deleteDay}/></Modal>}
        </>
    )
}

export default FixedDays