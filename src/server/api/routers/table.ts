
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { db } from "@/server/db";
import { z } from 'zod';
import { defaultTable } from "./lib/defaultTable";

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

            const table = await defaultTable(input.baseId, input.name, userId);
                    

            return table;
        }
        ),

    getTable: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {

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