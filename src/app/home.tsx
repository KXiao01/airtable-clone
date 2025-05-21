import { NavbarHome } from "./_components/navbarHome";
import { BaseTiles } from "./_components/baseTiles";
import { api } from "@/trpc/server";


export default async function Home() {

  // get bases from the server
  const bases = await api.base.getUserBases();


  return (
    <div>
      <NavbarHome />
      <BaseTiles bases={bases} />
    </div>
  );
}