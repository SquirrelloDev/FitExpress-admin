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
import {Address} from "../../types/dbtypes/Address";
import useAddressDelete from "../../queries/addresses/delete";
import useAddressesListQuery from "../../queries/addresses/listing";
import AddressDetails from "../../components/Modal/Views/AddressDetails";
import {UserFullData} from "../../types/dbtypes/UserData";
import {Grid} from "react-loader-spinner";
import {DeliveryPoint} from "../../types/dbtypes/DeliveryPoint";
import usePagination from "../../hooks/usePagination";

function Addresses() {
    const columnHelper = createColumnHelper<Address>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useAddressesListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID adresu',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('user_id', {
            header: 'Adres email klienta',
            cell: ({getValue}) => {
                const userData = getValue() as UserFullData
                const email = userData.email as string
                return <p>{email}</p>
            }
        }),
        columnHelper.accessor('street', {
            header: 'Ulica',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('building_no', {
            header: 'Nr. budynku',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('city', {
            header: 'Miasto',
            cell: ({getValue}) => {
                return <p>{getValue()}</p>
            }
        }),
        columnHelper.accessor('postal', {
            header: 'Kod pocztowy',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('voivodeship', {
            header: 'Województwo',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('linked_points', {
            header: 'Powiązane punkty',
            cell: ({getValue}) => {
                const points = getValue() as DeliveryPoint[];
                const pointsNames = points.map(point => point.name);
                if (pointsNames.length > 0) {
                    return <p>{pointsNames.length}</p>
                } else {
                    return <p style={{color: 'red'}}>{'Brak!'}</p>
                }
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.addresses}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {addresses, pageCount} = useMemo(() => ({
        addresses: isSuccess ? data!.addresses : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: addresses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.addresses);
    const {mutate, isLoading: isDeleting} = useAddressDelete();
    const deleteAddress = () => {
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
                   tableName={polishTableName} tableListing={TableListingType.addresses}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details &&
                <Modal><AddressDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete isDeleting={isDeleting} id={itemId} closeModal={setModalOpen} deleteMutation={deleteAddress}/></Modal>}
        </>
    )
}

export default Addresses