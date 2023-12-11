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
import useOrdersListQuery from "../../queries/orders/listing";
import useOrderDelete from "../../queries/orders/delete";
import OrderDetails from "../../components/Modal/Views/OrderDetails";
import {Order} from "../../types/dbtypes/Order";

function Orders() {
	const columnHelper = createColumnHelper<Order>()
	const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
		isOpen: false,
		modalType: ModalType.none
	});
	const [itemId, setItemId] = useState<string>("");
	const userData = useAuthStore((state) => state.userData);
	const {isLoading, data, isSuccess} = useOrdersListQuery({
		token: userData.token
	})
	const columns = [
		columnHelper.accessor('_id', {
			header: 'ID zamówienia',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('diet_id', {
			header: 'Nazwa diety',
			cell: ({getValue}) => <p>{getValue().name}</p>
		}),
		columnHelper.accessor('user_id', {
			header: 'Adres e-mail klienta',
			cell: ({getValue}) => {
			return <p>{getValue().email}</p>
			}
		}),
		columnHelper.accessor('sub_date', {
			header: 'Okres diety',
			cell: ({getValue}) => {
				const fromDate = new Date(getValue().from);
				const toDate = new Date(getValue().to);
				return <p>{`${fromDate.getDate()}-${fromDate.getMonth() + 1}-${fromDate.getFullYear()} - ${toDate.getDate()}-${toDate.getMonth() + 1}-${toDate.getFullYear()}`}</p>
			}
		}),
		columnHelper.accessor('calories', {
			header: 'Kaloryczność diety',
			cell: ({getValue}) => <p>{`${getValue()} kcal`}</p>
		}),
		columnHelper.accessor('_id', {
			id: 'actions', header: 'Akcje', cell: ({getValue}) => {

				const id = getValue();
				return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.orders}
								   setModalOpen={setModalOpen}/>
			}
		})
	]
	const {orders} = useMemo(() => ({
		orders: isSuccess ? data!.orders : []
	}), [data, isSuccess])
	const table = useReactTable({
		data: orders,
		columns,
		getCoreRowModel: getCoreRowModel()
	})
	const polishTableName = useTableListing(TableListingType.orders);
	const {mutate} = useOrderDelete();
	const deleteOrder = () => {
		mutate({id: itemId, token:userData.token}, {onSuccess: () => {
				setItemId("")
				setModalOpen({isOpen: false, modalType: ModalType.none})
			}})
	}
	if (isLoading) return <p>Loading meals...</p>
	return (
		<>
			<Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
				   tableName={polishTableName} tableListing={TableListingType.orders}/>
			{modalOpen.isOpen && modalOpen.modalType === ModalType.details && <Modal><OrderDetails id={itemId} token={userData.token} closeModal={setModalOpen} /></Modal>}
			{modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteOrder}/></Modal>}
		</>
	)
}
export default Orders