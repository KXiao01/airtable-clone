"use client";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { api } from "@/trpc/react";
import { useState } from "react";

import type { Column } from "@prisma/client";

import './styles/table.css'


interface TableProps {
    tableId: string;
}



export default function Table(TableProps: TableProps) {
    const { tableId } = TableProps;

    const { data: data, isLoading, error } = api.table.getTable.useQuery({ id: tableId });

    const columns = data?.columns.map((column: Column) => ({
        accessorKey: column.id,
        header: column.name,
        cell: (info: any) => info.getValue(),
    }));

    const columnHelper = createColumnHelper<Column>();

    const convertedData = [];
    for (let i = 0; i < (data?.rows.length ?? 0); i++) {
        const row = data?.rows?.[i];
        const cells = row?.cells ?? [];
        const convertedRow: any = {};
        for (let j = 0; j < (cells.length ?? 0); j++) {
            const cell = cells[j];
            const column = data?.columns.find((col: Column) => col.id === cell?.columnId);
            if (column) {
                convertedRow[column.id] = cell?.value;
            }
        }
        if (cells.length === 0) {
            for (let j = 0; j < (data?.columns.length ?? 0); j++) {
                const column = data?.columns[j];
                if (column) {
                    convertedRow[column.id] = '';
                }
            }
        }

        convertedData.push(convertedRow);
    }

    const table = useReactTable({
        data: convertedData ?? [],
        columns: columns ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div className="w-full">
            <table className="table-auto w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}


