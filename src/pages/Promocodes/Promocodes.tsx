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
import {Promocode} from "../../types/dbtypes/Promocode";
import usePromosListQuery from "../../queries/promocodes/listing";
import usePromoDelete from "../../queries/promocodes/delete";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";
import calcLowerDate from "../../utils/calcMonth";

function Promocodes() {
    const columnHelper = createColumnHelper<Promocode>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = usePromosListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('name', {
            header: 'Nazwa',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('discount', {
            header: 'Wartość zniżki',
            cell: ({getValue}) => {
                const prettyPromo = `${getValue() * 100}%`
                return <p>{prettyPromo}</p>
            }
        }),
        columnHelper.accessor('exp_date', {
            header: 'Ważność kodu',
            cell: ({getValue}) => {
                const date = new Date(getValue())
                return <p>{`${calcLowerDate(date.getDate())}-${calcLowerDate(date.getMonth() + 1)}-${date.getFullYear()}`}</p>
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.promocodes}
                                   setModalOpen={setModalOpen} hideDetails/>
            }
        })
    ]
    const {promocodes, pageCount} = useMemo(() => ({
        promocodes: isSuccess ? data!.promocodes : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: promocodes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.promocodes);
    const {mutate, isLoading: isDeleting} = usePromoDelete();
    const deletePromo = () => {
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
            <Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
                   tableName={polishTableName} tableListing={TableListingType.promocodes}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete isDeleting={isDeleting} id={itemId} closeModal={setModalOpen} deleteMutation={deletePromo}/></Modal>}
        </>
    )
}

export default Promocodes