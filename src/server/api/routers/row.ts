
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";



import { db } from "@/server/db";
import { z } from 'zod';

export const rowRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ tableId: z.string(), data: z.record(z.string(), z.any()) }))
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

            const row = await db.row.create({
                data: {
                    ...input.data,
                    tableId: input.tableId,
                },
            });

            return row;
        }
        ),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const base = await db.base.findFirst({
                where: {
                    userId: userId,
                    tables: {
                        some: {
                            rows: {
                                some: {
                                    id: input.id,
                                },
                            },
                        },
                    },
                },
            });

            if (!base) {
                throw new Error("Unauthorized or base not found");
            }

            const row = await db.row.delete({
                where: {
                    id: input.id,
                },
            });

            return row;
        }
    ),
});
