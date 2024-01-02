/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CaretDoubleLeft, CaretDoubleRight, CaretDown, CaretLeft, CaretRight, CaretUp } from "@phosphor-icons/react";
import { OnChangeFn, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "../Button";
import { Select } from "../Select";

type TableProps = {
    data: any[];
    setData?: Dispatch<SetStateAction<any[]>>
    columns: any;
    paginateTable?: boolean;
    tablePageSizes?: number[];
    sorting?: SortingState;
    setSorting?: OnChangeFn<SortingState>
    handleSetColumnVisibility?: {}
}

export function Table({ data, setData, columns, paginateTable, tablePageSizes, sorting, setSorting, handleSetColumnVisibility }: TableProps) {
    const pageSizes = tablePageSizes || [500, 1000];
    const [columnVisibility, setColumnVisibility] = useState(handleSetColumnVisibility || {});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
        },
        enableSorting: sorting ? true : false,
        enableSortingRemoval: false,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: paginateTable ? getPaginationRowModel() : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        meta: {
            updateData: (rowIndex: number, columnId: string, value: string) => {
                if (!setData) return;
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        },
    });

    useEffect(() => {
        if (paginateTable && pageSizes[0] != table.getState().pagination.pageSize) {
            table.setPageSize(pageSizes[0]);
        }
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full relative overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className={classNames("text-sm font-medium px-6 pb-4 text-gray-500", {
                                    ["w-[5%]"]: header.column.columnDef.size === 5,
                                    ["w-[10%]"]: header.column.columnDef.size === 10,
                                    ["w-[15%]"]: header.column.columnDef.size === 15,
                                    ["w-[20%]"]: header.column.columnDef.size === 20,
                                    ["w-[25%]"]: header.column.columnDef.size === 25,
                                    ["w-[30%]"]: header.column.columnDef.size === 30,
                                    ["w-[35%]"]: header.column.columnDef.size === 35,
                                    ["w-[40%]"]: header.column.columnDef.size === 40,
                                    ["w-[50%]"]: header.column.columnDef.size === 50,
                                    ["w-[75%]"]: header.column.columnDef.size === 75,
                                })} scope="col" key={header.id}>
                                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                        <button
                                            aria-label="Botão de ordenação de coluna"
                                            className="relative select-none"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-1">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() == "desc" ? (
                                                        <CaretDown className="absolute right-[-1.5rem] text-primary-500" size={16} weight="bold" />
                                                    ) : (
                                                        <CaretUp className="absolute right-[-1.5rem] text-primary-500" size={16} weight="bold" />
                                                    )
                                                ) : null}
                                            </div>
                                        </button>
                                    ) : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className="odd:bg-[rgba(0,_0,_0,_.05)] dark:odd:bg-[rgba(255,_255,_255,_.05)] bg-transparent transition duration-200 ease-in-out hover:bg-[rgba(0,_0,_0,_.09)] dark:hover:bg-[rgba(255,_255,_255,_.09)]" key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className="px-6 py-4 whitespace-nowrap font-light first:rounded-l-md last:rounded-r-md" key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {paginateTable && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex">
                        <p className="flex items-center gap-1">
                            Mostrando
                            <span className="font-semibold mx-1">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>
                            a
                            <span className="font-semibold mx-1">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getRowModel().rows.length}</span>
                            de
                            <span className="font-semibold mx-1">{data.length}</span>
                            resultados
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            ariaLabel="Botão para voltar ao início da tabela"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            variant="secondary"
                            icon={<CaretDoubleLeft size={24} />}
                        />
                        <Button
                            type="button"
                            ariaLabel="Botão para voltar uma página na tabela"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            variant="secondary"
                            icon={<CaretLeft size={24} />}
                        >
                            Anterior
                        </Button>
                        <Button
                            type="button"
                            ariaLabel="Botão para avançar uma página na tabela"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            variant="secondary"
                            icon={<CaretRight size={24} />}
                        >
                            Próxima
                        </Button>
                        <Button
                            type="button"
                            ariaLabel="Botão para ir ao final da tabela"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            variant="secondary"
                            icon={<CaretDoubleRight size={24} />}
                        />
                    </div>
                    <div className="flex">
                        <Select
                            id="table-page-size"
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {pageSizes.map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>
            )}
        </div>
    );
}