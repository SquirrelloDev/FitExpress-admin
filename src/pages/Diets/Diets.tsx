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
import {Diet} from "../../types/dbtypes/Diet";
import useDietsListQuery from "../../queries/diets/listing";
import useDietDelete from "../../queries/diets/delete";
import DietDetails from "../../components/Modal/Views/DietDetails";
import {Grid} from "react-loader-spinner";
import {IconPhotoOff} from "@tabler/icons-react";
import usePagination from "../../hooks/usePagination";

function Diets() {
    const columnHelper = createColumnHelper<Diet>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useDietsListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID diety',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('name', {
            header: 'Nazwa',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('diet_type', {
            header: 'Rodzaj',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('imageBuffer', {
            header: 'Zdjęcie',
            cell: ({getValue}) => {
                if (!getValue()) {
                    return <IconPhotoOff size={30}/>
                }
                return (
                    <img src={'data:;base64,' + `${getValue()}`} width={80} height={80}/>
                )
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.diets}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {diets, pageCount} = useMemo(() => ({
        diets: isSuccess ? data!.diets : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: diets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.diets);
    const {mutate} = useDietDelete();
    const deleteDiet = () => {
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
                   tableName={polishTableName} tableListing={TableListingType.diets}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details &&
                <Modal><DietDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteDiet}/></Modal>}
        </>
    )
}

export default Diets