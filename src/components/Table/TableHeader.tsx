import classes from "../../sass/components/table.module.scss";
import {IconChevronLeft, IconChevronRight, IconPlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import useListingRoute from "../../hooks/useListingRoute";
import {TableListingType} from "../../types/table/tableListing";
import clsx from "clsx";

interface TableHeaderProps {
    tableName: string,
    tableListing: TableListingType,
    previousPage: () => void,
    nextPage: () => void,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    pageIndex: number,
    pageCount: number,
    hideAdding: boolean
}

function TableHeader({
                         tableName,
                         tableListing,
                         previousPage,
                         nextPage,
                         hasPreviousPage,
                         hasNextPage,
                         pageIndex,
                         pageCount,
                         hideAdding
                     }: TableHeaderProps) {
    const navigate = useNavigate()
    const linkRoute = useListingRoute(tableListing);
    return (
        <div className={classes.table__header}>
            <h2>{tableName}</h2>
            <button onClick={() => previousPage()} disabled={!hasPreviousPage} className={clsx(classes.table__header__button, classes['table__header__button--paginaton'])}><IconChevronLeft /></button>
            <span>Strona {pageIndex} z {pageCount}</span>
            <button onClick={() => nextPage()} disabled={!hasNextPage} className={clsx(classes.table__header__button, classes['table__header__button--paginaton'])}><IconChevronRight /></button>
            {!hideAdding && <button className={classes['table__header__button']} onClick={() => navigate(`${linkRoute}/create`)}><IconPlus stroke={2}/> Dodaj</button>}
        </div>
    )
}

export default TableHeader