'use client'
import Link from "next/link"
import { GiTabletopPlayers } from 'react-icons/gi'
import { usePathname } from "next/navigation"
import { AiOutlineOrderedList } from 'react-icons/ai'





export default function HubHeader() {
    const route = usePathname()
    return(
        <div className="flex flex-row gap-1 p-2 rounded bg-blue-600 text-white">
            <Link href={'/hub/queues'} className={`${route.includes('queue') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                <GiTabletopPlayers/>
            </Link>
            <Link href={'/hub/leaderboard'} className={`${route.includes('leaderboard') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                <AiOutlineOrderedList/>
            </Link>
        </div>
    )
}