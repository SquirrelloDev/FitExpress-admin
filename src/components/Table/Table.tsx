import {flexRender,  HeaderGroup, Row, } from "@tanstack/react-table";
import classes from "../../sass/components/table.module.scss";
import {IconPlus} from "@tabler/icons-react";
interface TableProps<T>{
    headerGroups: HeaderGroup<T>[],
    rows: Row<T>[]
    isLoading: boolean,
    tableName: string
}
export function Table<T>({headerGroups, rows, isLoading, tableName}: TableProps<T>) {
    return (
        <div className={classes.table__container}>
            <div className={classes.table__title}>
                <h2>{tableName}</h2>
                <button className={classes['table__title__button-new']}><IconPlus stroke={2}/> Dodaj</button>
            </div>
            <table className={classes.table__table}>
                <thead>
                {headerGroups.map(headerGroup => <tr key={headerGroup.id} className={classes.table__table__row__header}>
                    {headerGroup.headers.map(header =>{
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
                        {row.getVisibleCells().map(cell => <td key={cell.id} className={classes.table__table__row__cell}>
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
                <div>
                    <p>No result found</p>
                </div>
            )}
        </div>
    )
}
export default Table