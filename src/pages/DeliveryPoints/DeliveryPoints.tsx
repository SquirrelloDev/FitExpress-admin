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
import {DeliveryPoint} from "../../types/dbtypes/DeliveryPoint";
import useDeliveryListQuery from "../../queries/delivery/listing";
import useDeliveryDelete from "../../queries/delivery/delete";

function DeliveryPoints() {
	const columnHelper = createColumnHelper<DeliveryPoint>()
	const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
		isOpen: false,
		modalType: ModalType.none
	});
	const [itemId, setItemId] = useState<string>("");
	const userData = useAuthStore((state) => state.userData);
	const {isLoading, data, isSuccess} = useDeliveryListQuery({
		token: userData.token
	})
	const columns = [
		columnHelper.accessor('name', {
			header: 'Nazwa',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('lat', {
			header:'Szerokość geo.',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('lng', {
			header:'Długość geo.',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('radiusKM', {
			header: 'Promień w km',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('_id', {
			id: 'actions', header: 'Akcje', cell: ({getValue}) => {

				const id = getValue();
				return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.deliveryPoints}
								   setModalOpen={setModalOpen} hideDetails/>
			}
		})
	]
	const {points} = useMemo(() => ({
		points: isSuccess ? data!.points : []
	}), [data, isSuccess])
	const table = useReactTable({
		data: points,
		columns,
		getCoreRowModel: getCoreRowModel()
	})
	const polishTableName = useTableListing(TableListingType.deliveryPoints);
	const {mutate} = useDeliveryDelete();
	const deleteDelivery = () => {
		mutate({id: itemId, token:userData.token}, {onSuccess: () => {
				setItemId("")
				setModalOpen({isOpen: false, modalType: ModalType.none})
			}})
	}
	if (isLoading) return <p>Loading meals...</p>
	return (
		<>
			<Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
				   tableName={polishTableName} tableListing={TableListingType.deliveryPoints}/>
			{modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteDelivery}/></Modal>}
		</>
	)
}
export default DeliveryPoints