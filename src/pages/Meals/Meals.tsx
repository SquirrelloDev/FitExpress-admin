import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {ModalType} from "../../types/table/modalType";
import useAuthStore from "../../stores/authStore";
import useMealListQuery from "../../queries/meals/listing";
import {Meal} from "../../types/dbtypes/Meal";
import RowActions from "../../components/Table/RowActions";
import {TableListingType} from "../../types/table/tableListing";
import useTableListing from "../../hooks/useTableListing";
import Table from "../../components/Table/Table";
import {Exclusion} from "../../types/dbtypes/Exclusions";
import {Tag} from "../../types/dbtypes/Tags";
import Modal from "../../components/Modal/Modal";
import MealDetails from "../../components/Modal/Views/MealDetails";
import ViewDelete from "../../components/Modal/Views/ViewDelete";
import useMealDelete from "../../queries/meals/delete";
import {Grid} from "react-loader-spinner";
import {IconPhotoOff} from "@tabler/icons-react";

function Meals() {
    const columnHelper = createColumnHelper<Meal>()
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean, modalType: ModalType }>({
        isOpen: false,
        modalType: ModalType.none
    });
    const [itemId, setItemId] = useState<string>("");
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data, isSuccess} = useMealListQuery({
        token: userData.token
    })
    const columns = [
        columnHelper.accessor('name', {
            header: 'Nazwa',
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('exclusions', {
            header: 'Wykluczenia',
            cell: ({getValue}) => {
                const exclusions = getValue() as Exclusion[]
                if(exclusions.length < 1){
                    return <p>brak</p>
                }
                const exclusionNames = exclusions.map(exclusion => `${exclusion.name},`)
                return <p>{...exclusionNames}</p>
            }
        }),
        columnHelper.accessor('tags_id', {
            header: 'Tagi',
            cell: ({getValue}) =>{
                const tags = getValue() as Tag[]
                if(tags.length < 1){
                    return <p>brak</p>
                }
                const prettyTags = tags.map(tag => `${tag.name},`)
               return <p>{...prettyTags}</p>
            }
        }),
        columnHelper.accessor('imageBuffer', {
            header: 'Zdjęcie',
            cell: ({getValue}) => {
                if(!getValue()){
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
                return <RowActions id={id} setItemId={setItemId} listingRoute={TableListingType.meals}
                                   setModalOpen={setModalOpen}/>
            }
        })
    ]
    const {meals} = useMemo(() => ({
        meals: isSuccess ? data!.meals : []
    }), [data, isSuccess])
    const table = useReactTable({
        data: meals,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    const polishTableName = useTableListing(TableListingType.meals);
    const {mutate} = useMealDelete();
    const deleteMeal = () => {
      mutate({id: itemId, token:userData.token}, {onSuccess: () => {
              setItemId("")
              setModalOpen({isOpen: false, modalType: ModalType.none})
          }})
    }
    if (isLoading) return <Grid />
    return (
        <>
            <Table headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} isLoading={isLoading}
                   tableName={polishTableName} tableListing={TableListingType.meals}/>
            {modalOpen.isOpen && modalOpen.modalType === ModalType.delete && <Modal><ViewDelete id={itemId} closeModal={setModalOpen} deleteMutation={deleteMeal}/></Modal>}
            {modalOpen.isOpen && modalOpen.modalType === ModalType.details && <Modal><MealDetails id={itemId} token={userData.token} closeModal={setModalOpen}/></Modal>}
        </>
    )
}

export default Meals