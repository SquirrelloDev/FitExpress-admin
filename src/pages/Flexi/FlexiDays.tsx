import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import useFlexiListQuery from "../../queries/flexi/listing";
import useFlexiDelete from "../../queries/flexi/delete";
import FlexiDetails from "../../components/Modal/Views/FlexiDetails";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";

function FlexiDays() {
    const columnHelper = createColumnHelper<DayFlexi>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useFlexiListQuery({
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
                return <p>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {
                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.dayFlexi}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {flexiDays, pageCount} = useMemo(() => ({
        flexiDays: isSuccess ? data!.flexiDays.sort((dayA, dayB) => {
            return (new Date(dayB.date).getTime() - new Date(dayA.date).getTime())
        }) : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        columns,
        data: flexiDays,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.dayFlexi);
    const {mutate} = useFlexiDelete();
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
                   rows={table.getRowModel().rows} tableListing={TableListingType.dayFlexi}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details &&
                <Modal><FlexiDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteDay}/></Modal>}
        </>
    )
}

export default FlexiDays