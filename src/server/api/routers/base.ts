
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";


import { db } from "@/server/db";
import { z } from 'zod';

import { defaultTable } from "./lib/defaultTable";

export const baseRouter = createTRPCRouter({
    getUserBases: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const bases = await db.base.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return bases;
    }
    ),

    create: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const base = await db.base.create({
            data: {
                name: "Untitled Base",
                userId: userId,
            },
        });

        await defaultTable(base.id, "Untitled Table", userId);
        return base;
    }
    ),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const base = await db.base.findUnique({
            where: {
                id: input.id,
                userId: userId,
            },

        });

        if (!base || base.userId !== userId) {
            throw new Error("Unauthorized or base not found");
        }

        
        await db.base.delete({
            where: {
                id: input.id,
            },
        });

        return { success: true };
    }
    ),

    getBase: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const base = await db.base.findUnique({
            where: {
                id: input.id,
                userId: userId,
            },
            include: {
                tables: true,
            },
        });

        if (!base || base.userId !== userId) {
            throw new Error("Unauthorized or base not found");
        }

        return base;
    }
    ),
});