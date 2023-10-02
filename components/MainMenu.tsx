'use client'
import Link from "next/link";
import { IoHome, IoHomeOutline, IoPeople, IoPeopleOutline, IoPerson, IoPersonOutline } from 'react-icons/io5'
import { usePathname } from "next/navigation";








export default function MainMenu() {
    const pathname = usePathname()
    return(
        <div className="flex flex-col gap-2 sticky top-0 left-0 max-w-[200px] max-h-screen h-screen w-full bg-blue-600 p-2 overflow-auto text-white scrollBar">
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
    )
}