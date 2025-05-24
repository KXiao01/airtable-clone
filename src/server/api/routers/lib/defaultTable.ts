import { db } from "@/server/db";
import { ColumnType } from "@prisma/client";

export async function defaultTable(baseId: string, name: string, userId: string) {

    const base = await db.base.findUnique({
        where: {
            id: baseId,
            userId: userId,
        },
    });

    if (!base) {
        throw new Error("Unauthorized or base not found");
    }

    const table = await db.table.create({
        data: {
            name,
            baseId
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