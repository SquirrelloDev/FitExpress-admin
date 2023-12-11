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
import {Exclusion} from "../../types/dbtypes/Exclusions";
import useExclusionDelete from "../../queries/exclusions/delete";
import useExclusionsListQuery from "../../queries/exclusions/listing";

function Exclusions() {
	const columnHelper = createColumnHelper<Exclusion>()
	const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
		isOpen: false,
		modalType: ModalType.none
	});
	const [itemId, setItemId] = useState<string>("");
	const userData = useAuthStore((state) => state.userData);
	const {isLoading, data, isSuccess} = useExclusionsListQuery({
		token: userData.token
	})
	const columns = [
		columnHelper.accessor('name', {
			header: 'Nazwa',
			cell: ({getValue}) => <p>{getValue()}</p>
		}),
		columnHelper.accessor('_id', {
			id: 'actions', header: 'Akcje', cell: ({getValue}) => {

				const id = getValue();
				return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.exclusions}
								   setModalOpen={setModalOpen} hideDetails/>
			}
		})
	]
	const {exclusions} = useMemo(() => ({
		exclusions: isSuccess ? data!.exclusions : []
	}), [data, isSuccess])
	const table = useReactTable({
		data: exclusions,
		columns,
		getCoreRowModel: getCoreRowModel()
	})
	const polishTableName = useTableListing(TableListingType.exclusions);
	const {mutate} = useExclusionDelete();
	const deleteExclusion = () => {
		mutate({id: itemId, token:userData.token}, {onSuccess: () => {
				setItemId("")
				setModalOpen({isOpen: false, modalType: ModalType.none})
			}})
	}
	if (isLoading) return <p>Loading meals...</p>
	return (
		<>
			<Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
				   tableName={polishTableName} tableListing={TableListingType.tags}/>
			{modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteExclusion}/></Modal>}
		</>
	)
}
export default Exclusions