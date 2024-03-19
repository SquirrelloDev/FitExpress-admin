import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Report} from "../../types/dbtypes/Report";
import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import {UserFullData} from "../../types/dbtypes/UserData";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import useReportsListQuery from "../../queries/reports/listing";
import useReportDelete from "../../queries/reports/delete";
import useReportStausCategory from "../../hooks/useReportStausCategory";
import ReportDetails from "../../components/Modal/Views/ReportDetails";
import {Grid} from "react-loader-spinner";
import usePagination from "../../hooks/usePagination";

function Reports() {
    const columnHelper = createColumnHelper<Report>()
    const [paginationParams, setPaginationParams] = usePagination()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useReportsListQuery({
        token: userData.token,
        pageIndex: paginationParams.pageIndex,
        pageSize: paginationParams.pageSize
    })
    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID zgłoszenia',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('order_id', {
            header: 'ID zamówienia',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('user_id', {
            header: 'Adres email klienta',
            cell: ({getValue}) => {
                const userData = getValue() as UserFullData
                const email = userData ? userData.email : 'N/A' as string
                return <p>{email}</p>
            }
        }),
        columnHelper.accessor('report_status', {
            header: 'Status',
            cell: ({getValue}) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const {statusPL} = useReportStausCategory(getValue());
                return <p>{statusPL}</p>
            }
        }),
        columnHelper.accessor('category', {
            header: 'Kategoria',
            cell: ({getValue}) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const {categoryPL} = useReportStausCategory(undefined, getValue())
                return <p>{categoryPL}</p>
            }
        }),
        columnHelper.accessor('_id', {
            id: 'actions', header: 'Akcje', cell: ({getValue}) => {

                const id = getValue();
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.reports}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {reports, pageCount} = useMemo(() => ({
        reports: isSuccess ? data!.reports : [],
        pageCount: isSuccess ? data!.paginationInfo.lastPage : 0
    }), [data, isSuccess])
    const table = useReactTable({
        data: reports,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange: setPaginationParams,
        state: {
            pagination: paginationParams
        }
    })
    const polishTableName = useTableListing(TableListingType.reports);
    const {mutate, isLoading: isDeleting} = useReportDelete();
    const deleteReport = () => {
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
                   tableName={polishTableName} tableListing={TableListingType.reports}
                   tablePaginationState={table.getState().pagination}
                   previousPage={table.previousPage}
                   pageCount={table.getPageCount()}
                   hasPreviousPage={table.getCanPreviousPage()}
                   nextPage={table.nextPage}
                   hasNextPage={table.getCanNextPage()}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details &&
                <Modal><ReportDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete &&
                <Modal><ViewDelete isDeleting={isDeleting} id={itemId} closeModal={setModalOpen} deleteMutation={deleteReport}/></Modal>}
        </>
    )
}

export default Reports