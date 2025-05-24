
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { db } from "@/server/db";
import { z } from 'zod';
import { ColumnType } from "@prisma/client";

export const tableRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ baseId: z.string(), name: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const base = await db.base.findUnique({
                where: {
                    id: input.baseId,
                    userId: userId,
                },
            });

            if (!base) {
                throw new Error("Unauthorized or base not found");
            }

            const table = await db.table.create({
                data: {
                    name: input.name,
                    baseId: input.baseId,
                },
            });

            const column1 = await db.column.create({
                data: {
                    name: "Name",
                    type: ColumnType.TEXT,
                    tableId: table.id,
                },
            });
            const column2 = await db.column.create({
                data: {
                    name: "Description",
                    type: ColumnType.TEXT,
                    tableId: table.id,
                },
            });
            const column3 = await db.column.create({
                data: {
                    name: "Number",
                    type: ColumnType.NUMBER,
                    tableId: table.id,
                },
            });

            const columns = [column1, column2, column3];

            const row1 = await db.row.create({
                data: { tableId: table.id },
            });
            const row2 = await db.row.create({
                data: { tableId: table.id },
            });
            const row3 = await db.row.create({
                data: { tableId: table.id },
            });

            const cells = await db.cell.createMany({
                data: [
                    {
                        rowId: row1.id,
                        columnId: column1.id,
                        value: "Row 1",
                    },
                    {
                        rowId: row1.id,
                        columnId: column2.id,
                        value: "Description 1",
                    },
                    {
                        rowId: row1.id,
                        columnId: column3.id,
                        value: '1',
                    },
                ],
            });
                    

            return table;
        }
        ),

    getTable: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;


            const table = await db.table.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    columns: true,
                    rows: {
                        include: {
                            cells: {
                                include: {
                                    column: true,
                                },
                            },
                        },
                    },
                },
            });
            
            if (!table) {
                throw new Error("Unauthorized or table not found");
            }
            return table;
        }
        ),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const table = await db.table.findUnique({
                where: {
                    id: input.id,
                    base: {
                        userId: userId,
                    },
                },
            });
            if (!table) {
                throw new Error("Unauthorized or table not found");
            }
            const deletedTable = await db.table.delete({
                where: {
                    id: input.id,
                },
            });
            return deletedTable;

 
        }
        ),



});