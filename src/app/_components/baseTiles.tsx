'use client';


import type { Base } from "@prisma/client";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import './base.css';


export function BaseTiles({ bases }: { bases: Base[] }) {
  const router = useRouter();
  const createBase = api.base.create.useMutation({
    onSuccess: (data) => {
      router.push(`/base/${data.id}`);
    },
  });

  const handleCreateBase = () => {
    createBase.mutate();
  };

  const deleteBase = api.base.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDeleteBase = (id: string) => {
    deleteBase.mutate({ id });
  };

  const handleBaseClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target instanceof HTMLButtonElement && e.target.classList.contains("delete-btn")) {
      return;
    }

    router.push(`/base/${id}`);
  };

  return (
    <div className="flex min-h-screen container flex-start ml-10 mt-5">
      <div className="flex flex-col container">
        <h1>Bases</h1>
        <div className="container bases">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            <div className="border border-dashed border-gray-400 rounded p-6 flex justify-center items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleCreateBase()}>
              <span className="text-gray-600 font-medium">+ New Base</span>
            </div>

            {bases.map((n) => (
              <div
                key={n.id}
                className="border border-gray-400 rounded p-4 hover:shadow-md flex flex-col justify-between cursor-pointer"
                onClick={(e) => handleBaseClick(e, n.id)}
              >
                <div className="text-lg font-semibold">{n.name}</div>
                <Button className="border text-red-500 mt-2 self-end text-sm delete-btn hover:bg-red-100" onClick={() => handleDeleteBase(n.id)}>Delete</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}