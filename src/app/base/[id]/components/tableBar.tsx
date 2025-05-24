
import type {Table} from "@prisma/client";

interface TableBarProps {
    tables: Table[];
}

export default function TableBar(tableProps: TableBarProps) {
    const { tables } = tableProps;

    return (
        <div className="flex h-10 items-center justify-between bg-gray-900 px-4">
                <div className="flex tables container h-full items-center flex-start">
                    {tables.map((table) => (
                        <div key={table.id} className="mr-4 outline h-full flex items-center pr-2 pl-2 cursor-pointer hover:bg-gray-800 rounded">
                            <p className="text-white hover:text-gray-300">
                                {table.name}
                            </p>
                        </div>
                    ))}
            </div>
        </div>


    )



}