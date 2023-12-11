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

function Tags() {
	const columnHelper = createColumnHelper<Tag>()
	const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
		isOpen: false,
		modalType: ModalType.none
	});
	const [itemId, setItemId] = useState<string>("");
	const userData = useAuthStore((state) => state.userData);
	const {isLoading, data, isSuccess} = useTagsListQuery({
		token: userData.token
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
	const {tags} = useMemo(() => ({
		tags: isSuccess ? data!.tags : []
	}), [data, isSuccess])
	const table = useReactTable({
		data: tags,
		columns,
		getCoreRowModel: getCoreRowModel()
	})
	const polishTableName = useTableListing(TableListingType.tags);
	const {mutate} = useTagDelete();
	const deleteMeal = () => {
		mutate({id: itemId, token:userData.token})
	}
	if (isLoading) return <p>Loading meals...</p>
	return (
		<>
			<Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
				   tableName={polishTableName} tableListing={TableListingType.tags}/>
			{modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteMeal}/></Modal>}
		</>
	)
}
export default Tags