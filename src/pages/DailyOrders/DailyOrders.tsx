import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import {OrdersArr} from "../../types/dbtypes/DailyOrder";
import {useOneDailyOrderListQuery} from "../../queries/daily-orders/listing";
import {Address} from "../../types/dbtypes/Address";
import {DailyDetails} from "../../components/Modal/Views/DailyDetails";

export function DailyOrders() {
	const columnHelper = createColumnHelper<OrdersArr>()
	const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
		isOpen: false,
		modalType: ModalType.none
	});
	const [itemId, setItemId] = useState<string>("");
	const userData = useAuthStore((state) => state.userData);
	const currentDate = new Date();
	const {isLoading, data, isSuccess} = useOneDailyOrderListQuery({
		token: userData.token,
		date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
	})
	const columns = [
		columnHelper.accessor('_id', {
			header: 'ID zamówienia',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('user_id.email', {
			header: 'Adres email klienta',
			cell: ({getValue}) => {
				return <p>{getValue()}</p>
			}
		}),
		columnHelper.accessor('order_id.calories', {
			header: 'Kaloryczność',
			cell: ({getValue}) => {
				return <p>{`${getValue()} kcal`}</p>
			}
		}),
		columnHelper.accessor('diet_id.name', {
			header: 'Dieta',
			cell: ({getValue}) => {
				return <p>{getValue()}</p>
			}
		}),
		columnHelper.accessor('order_id.address_id', {
			header: 'Adres dostawy',
			cell: ({getValue}) => {
				const addressObj = getValue() as Address;
				const addressString = `${addressObj.street} ${addressObj.building_no}/${addressObj.apartment_no ? addressObj.apartment_no : ''}, ${addressObj.city}`
				return <p>{addressString}</p>
			}
		}),
		columnHelper.accessor('order_id._id', {
			id: 'actions', header: 'Akcje', cell: ({getValue}) => {
				const id = getValue();
				return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.dailyOrders}
								   setModalOpen={setModalOpen} hideEdit hideDelete/>
			}
		})
	]
	const {dailyOrder} = useMemo(() => ({
		dailyOrder: (isSuccess && data!.daily) ? data!.daily.orders.filter((order) => order.order_id !== null && order.diet_id !== null && order.user_id !== null) : []
	}), [data, isSuccess])
	const table = useReactTable({
		columns,
		data: dailyOrder,
		getCoreRowModel: getCoreRowModel()
	})
	const polishTableName = useTableListing(TableListingType.dailyOrders);
	if (isLoading) return <p>Loading days...</p>
	return (
		<>
			<Table hideAdding isLoading={isLoading} tableName={polishTableName} headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} tableListing={TableListingType.dailyOrders}/>
			{modalOpen.isOpen && modalOpen.modalType === ModalType.details && <Modal><DailyDetails id={itemId} ordersArr={dailyOrder} closeModal={setModalOpen} /></Modal>}
		</>
	)
}