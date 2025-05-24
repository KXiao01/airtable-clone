
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { ColumnType } from "@prisma/client";

import { db } from "@/server/db";
import { z } from 'zod';

export const columnRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ tableId: z.string(), name: z.string(), type: z.nativeEnum(ColumnType) }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const base = await db.base.findFirst({
                where: {
                    userId: userId,
                    tables: {
                        some: {
                            id: input.tableId,
                        },
                    },
                },
            });

            if (!base) {
                throw new Error("Unauthorized or base not found");
            }

            const column = await db.column.create({
                data: {
                    name: input.name,
                    type: input.type,
                    tableId: input.tableId,
                },
            });

            return column;
        }
        ),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const column = await db.column.delete({
                where: {
                    id: input.id,
                },
            });

            return { success: true };
        }
        ),
});