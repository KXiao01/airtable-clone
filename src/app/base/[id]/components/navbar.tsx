import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image';

import type { Base, Table } from "@prisma/client";


type NavbarProps = Base & {
    tables: Table[];
};

export default function Navbar(base: NavbarProps) {
    return (
        <div className="flex h-16 items-center justify-between bg-gray-800 px-4">
            <div className="text-white flex items-center">
                <Link href="/" className="text-white hover:text-gray-300 mr-4">
                    TableAir
                </Link>
                <div>
                    {base?.name}
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                    <div className ='cursor-pointer'>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer">
                            <Image
                                width={40}
                                height={40}
                                alt=""
                                src="https://ih1.redbubble.net/image.2991310218.5250/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
                                className="size-8 rounded-full"
                            />
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <Link
                                href="/api/auth/signout"
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                                Sign out
                            </Link>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}


