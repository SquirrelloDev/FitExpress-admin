import {createColumnHelper, flexRender, getCoreRowModel, HeaderGroup, Row, useReactTable} from "@tanstack/react-table";
import {UserFullData} from "../../types/dbtypes/UserData";
import { UserRole } from "../../utils/userRoles";
import RowActions from "./RowActions";
import {TableListingType} from "../../types/table/tableListing";
interface TableProps<T>{
    headerGroups: HeaderGroup<T>[],
    rows: Row<T>[]
    isLoading: boolean,
}
export function Table({headerGroups, rows, isLoading}: TableProps<T>) {
    return (
        <div>
            <table border={1}>
                <thead>
                {headerGroups.map(headerGroup => <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header =>{
                        const headerName = header.column.columnDef.header as string;
                        return (
                            <th key={header.id}>{headerName}</th>
                        )
                    })}
                </tr>)}
                </thead>
                <tbody>
                {
                    rows.map(row => <tr key={row.id}>
                        {row.getVisibleCells().map(cell => <td key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>)}
                    </tr>)
                }
                </tbody>

            </table>
        </div>
    )
}
export default Table