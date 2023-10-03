'use client'
import Link from "next/link";
import { IoHome, IoHomeOutline, IoPeople, IoPeopleOutline, IoPerson, IoPersonOutline } from 'react-icons/io5'
import { usePathname } from "next/navigation";
import { SiteContext } from "@/context/SiteContext";
import { useContext } from 'react'
import { siteContextType } from "@/types";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { imageLoader } from "@/utils/src/imageLoader";





export default function MainMenu() {
    const pathname = usePathname()
    const { user }: siteContextType = useContext(SiteContext)
    return(
        <div className="flex flex-col gap-2 sticky top-0 left-0 max-w-[200px] max-h-screen h-screen w-full bg-blue-600 p-2 text-white z-50">
            <div className="flex flex-col gap-2 overflow-auto scrollBar">
                <Link href={'/'} className="menuLink">
                    { pathname == '/' && (
                        <div className="text-2xl">
                            <IoHome/>
                        </div>
                    )}
                    {pathname != '/' && (
                        <div className="text-2xl">
                            <IoHomeOutline/>
                        </div>
                    )}
                    <label className="cursor-pointer">Main Page</label>
                </Link>
                <Link href={'/players'} className="menuLink">
                    { pathname.startsWith('/players') && (
                        <div className="text-2xl">
                            <IoPerson/>
                        </div>
                    )}
                    {!pathname.startsWith('/players') && (
                        <div className="text-2xl">
                            <IoPersonOutline/>
                        </div>
                    )}
                    <label className="cursor-pointer">Players</label>
                </Link>
                <Link href={'/teams'} className="menuLink">
                    { pathname.startsWith('/teams') && (
                        <div className="text-2xl">
                            <IoPeople/>
                        </div>
                    )}
                    {!pathname.startsWith('/teams') && (
                        <div className="text-2xl">
                            <IoPeopleOutline/>
                        </div>
                    )}
                    <label className="cursor-pointer">Teams</label>
                </Link>
            </div>
            <Menu as={'div'} className={'flex flex-col relative mt-auto p-2 transition-all'}>
                {user? (
                    <Menu.Button className={'flex flex-row hover:bg-blue-800 gap-2 p-2 rounded-full font-semibold items-center transition-all'}>
                            <div className="flex w-8 h-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                                {user.avatar? (
                                    <Image
                                    src={`${process.env.storagePath}/players/${user._id.toString()}/avatar/${user.avatar}`}
                                    loader={imageLoader}
                                    alt={user.username}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover rounded-full"
                                    />
                                ): (
                                    <div className="text-xl text-white">
                                        <IoPerson/>
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer">{user.username}</label>
                    </Menu.Button>
                ): (
                    <Menu.Button className={'flex flex-row hover:bg-blue-800 p-2 rounded-full font-semibold'}>
                        <div className="text-xl text-white">
                            <IoPerson/>
                        </div>
                    </Menu.Button>
                )}
                
                <Menu.Items as={'div'} className={'flex flex-col w-full gap-2 p-2 rounded absolute top-0 right-0 -translate-y-full bg-blue-800 text-white'}>
                    <Menu.Item as={'div'}>

                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}