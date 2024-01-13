import {flexRender, HeaderGroup, PaginationState, Row,} from "@tanstack/react-table";
import classes from "../../sass/components/table.module.scss";
import {TableListingType} from "../../types/table/tableListing";
import TableHeader from "./TableHeader";

interface TableProps<T> {
    headerGroups: HeaderGroup<T>[],
    rows: Row<T>[]
    isLoading: boolean,
    tableName: string,
    tableListing: TableListingType
    hideAdding?: boolean,
    tablePaginationState: PaginationState
    previousPage: () => void,
    nextPage: () => void,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    pageCount: number
}

function Table<T>({
                      headerGroups,
                      rows,
                      isLoading,
                      tableName,
                      tableListing,
                      hideAdding = false,
                      nextPage,
                      previousPage,
                      hasNextPage,
                      hasPreviousPage,
                      tablePaginationState,
                      pageCount
                  }: TableProps<T>) {
    return (
        <div className={classes.table__container}>
            <TableHeader tableName={tableName} previousPage={previousPage} nextPage={nextPage}
                         hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage}
                         pageIndex={tablePaginationState ? tablePaginationState.pageIndex + 1 : 1}
                         pageCount={pageCount !== 0 ? pageCount : 1} hideAdding={hideAdding}
                         tableListing={tableListing}/>
            <table className={classes.table__table}>
                <thead>
                {headerGroups.map(headerGroup => <tr key={headerGroup.id} className={classes.table__table__row__header}>
                    {headerGroup.headers.map(header => {
                        const headerName = header.column.columnDef.header as string;
                        return (
                            <th key={header.id} className={classes.table__table__row__cell}>{headerName}</th>
                        )
                    })}
                </tr>)}
                </thead>
                <tbody>
                {
                    rows.map(row => <tr key={row.id} className={classes.table__table__row}>
                        {row.getVisibleCells().map(cell => <td key={cell.id}
                            className={classes.table__table__row__cell}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>)}
                    </tr>)
                }
                </tbody>
            </table>
            {isLoading && (
                <div>
                    <p>Loading...</p>
                </div>
            )}
            {!isLoading && rows.length < 1 && (
                <div className={classes['table__not-found']}>
                    <p>No result found</p>
                </div>
            )}
        </div>
    )
}

export default Table