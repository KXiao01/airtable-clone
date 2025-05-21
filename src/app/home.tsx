import { NavbarHome } from "./_components/navbarHome";
import { auth } from "@/server/auth";
import { Button } from '@headlessui/react'
import { BaseTiles } from "./_components/baseTiles";
import { api, HydrateClient } from "@/trpc/server";


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