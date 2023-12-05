import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {UserFullData} from "../../types/UserData";
import { UserRole } from "../../utils/userRoles";
interface TableProps{
    data?: UserFullData[]
}

const columnHelper = createColumnHelper<UserFullData>();
const columns = [
    columnHelper.accessor('name', {
        header: 'Nazwa użytkownika',
        cell: ({getValue}) => <p>{getValue()}</p>
    }),
    columnHelper.accessor('role', {
        header: 'Rola',
        cell: ({getValue}) => {
            const enumVal = getValue()
            return <p>{UserRole[enumVal]}</p>
        }
    }),
    columnHelper.accessor('birth_date', {
        header: 'Data ur.',
        cell: ({getValue}) => {
            const date = getValue()
            return <p>{date.toLocaleString()}</p>
        }
    }),
]

export function Table({data}: TableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    return (
        <div>
            <table border={1}>
                {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => <th key={header.id}>
                        <p>{header.column.columnDef.header}</p>
                    </th>)}
                </tr>)}
                {
                    table.getRowModel().rows.map(row => <tr key={row.id}>
                        {row.getVisibleCells().map(cell => <td key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>)}

                    </tr>)
                }
            </table>
        </div>
    )
}
export default Table