'use client'
import Link from "next/link";
import { IoHome, IoHomeOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5'
import { usePathname } from "next/navigation";








export default function MainMenu() {
    const pathname = usePathname()
    return(
        <div className="flex flex-col gap-2 sticky top-0 left-0 max-w-[200px] max-h-screen h-screen w-full bg-blue-600 p-2 overflow-auto text-white scrollBar">
            <Link href={'/'} className="menuLink">
                { pathname == '/' && (
                    <div className="text-xl">
                        <IoHome/>
                    </div>
                )}
                {pathname != '/' && (
                    <div className="text-xl">
                        <IoHomeOutline/>
                    </div>
                )}
                <label className="cursor-pointer">Main Page</label>
            </Link>
            <Link href={'/players'} className="menuLink">
                { pathname.startsWith('/players') && (
                    <div className="text-xl">
                        <IoPeople/>
                    </div>
                )}
                {!pathname.startsWith('/players') && (
                    <div className="text-xl">
                        <IoPeopleOutline/>
                    </div>
                )}
                <label className="cursor-pointer">Players</label>
            </Link>
        </div>
    )
}