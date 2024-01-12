import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import {Tag} from "../../types/dbtypes/Tags";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import useTagDelete from "../../queries/tags/delete";
import useTagsListQuery from "../../queries/tags/listing";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";

function Tags() {
    const columnHelper = createColumnHelper<Tag>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useTagsListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('name', {
            header: 'Nazwa',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('description', {
            header: 'Opis',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.tags}
                                   setModalOpen={setModalOpen} hideDetails/>
            }
        })
    ]
    const {tags, pageCount} = useMemo(() => ({
        tags: isSuccess ? data!.tags : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: tags,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.tags);
    const {mutate} = useTagDelete();
    const deleteMeal = () => {
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
                   tableName={polishTableName} tableListing={TableListingType.tags}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteMeal}/></Modal>}
        </>
    )
}

export default Tags