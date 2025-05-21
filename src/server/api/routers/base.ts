
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { db } from "@/server/db";

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
    )
});