
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";



import { db } from "@/server/db";
import { z } from 'zod';

export const cellRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ rowId: z.string(), columnId: z.string(), value: z.any() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const base = await db.base.findFirst({
                where: {
                    userId: userId,
                    tables: {
                        some: {
                            rows: {
                                some: {
                                    id: input.rowId,
                                },
                            },
                        },
                    },
                },
            });

            if (!base) {
                throw new Error("Unauthorized or base not found");
            }

            const cell = await db.cell.create({
                data: {
                    value: input.value,
                    rowId: input.rowId,
                    columnId: input.columnId,
                },
            });

            return cell;
        }
        ),
});
