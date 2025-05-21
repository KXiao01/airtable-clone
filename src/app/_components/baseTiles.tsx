'use client';


import type { Base } from "@prisma/client";
import { Button } from "@headlessui/react";




export function BaseTiles({ bases }: { bases: Base[] }) {
    return (
        <div className="flex min-h-screen container flex-start ml-10 mt-5">
            <div className="flex flex-col container">
                <h1>Bases</h1>
                <div className="container bases">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                        <div className="border border-dashed border-gray-400 rounded p-6 flex justify-center items-center hover:bg-gray-100 cursor-pointer">
                            <span className="text-gray-600 font-medium">+ New Base</span>
                        </div>

                        {[1, 2, 3,4,5,6,8,9].map((n) => (
                            <div
                                key={n}
                                className="border rounded p-4 hover:shadow-md flex flex-col justify-between"
                            >
                                <div className="text-lg font-semibold">Base {n}</div>
                                <Button className="text-red-500 mt-2 self-end text-sm" onClick={() => console.log("HI")}>Delete</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}