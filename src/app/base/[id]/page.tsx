import Navbar from "./components/navbar";
import { api } from "@/trpc/server";
import Table from "./components/table";
import TableBar from "./components/tableBar";


interface BasePageProps {
  params: { id: string };
}

export default async function Base({ params }: BasePageProps) {
  const { id } = params;
  const base = await api.base.getBase({ id });


  return (
    <div>
      <Navbar {...base} />
      <TableBar tables={base.tables}/>
      <Table tableId={base.tables[0]!.id} />

    </div>
  );
}