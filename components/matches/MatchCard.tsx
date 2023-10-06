'use client'

import { teamType, userType } from "@/types"
import Link from "next/link"
import { IoPeople } from "react-icons/io5"












export default function MatchCard({ homeTeam, awayTeam, homePlayers, awayPlayers }: { homeTeam?: teamType | undefined, awayTeam?: teamType | undefined, homePlayers?: userType[], awayPlayers?: userType[] }) {
    return(
        <div className="flex flex-col max-w-2xl w-full mx-auto gap-2 p-2 bg-slate-100 rounded border border-gray-300">
            <Link href={`/`} className="link">
                <h1 className="text-center">Türkiye 1. Ligi</h1>
            </Link>
            <label className="text-center">01.01.2024</label>
            <hr className="w-full border border-gray-300"/>
            <div className="flex flex-row">
                <div className="flex flex-col basis-1/2 gap-2 p-2 items-center border-r-gray-300 border-r">
                    <div className="flex h-40 w-40 rounded-full items-center justify-center text-8xl text-white bg-blue-600">
                        <IoPeople/>
                    </div>
                    <Link href={`/`} className="link">
                        <h1 className="text-2xl">LaSisX</h1>
                    </Link>
                    <h2 className="text-2xl text-gray-600">0</h2>
                    <hr className="w-full border border-gray-300"/>
                    <h3>Players</h3>
                    <Link href={`/`} className="flex flex-row gap-1 link items-center">
                        <div className="flex w-8 h-8 aspect-square rounded-full bg-blue-600 text-white text-xl items-center justify-center">
                            <IoPeople/>
                        </div>
                        <label className="cursor-pointer">Sharkman</label>
                    </Link>
                </div>
                <div className="flex flex-col basis-1/2 gap-2 p-2 items-center border-l-gray-300 border-l">
                    <div className="flex h-40 w-40 rounded-full items-center justify-center text-8xl text-white bg-blue-600">
                        <IoPeople/>
                    </div>
                    <Link href={`/`} className="link">
                        <h1 className="text-2xl">LaSisX</h1>
                    </Link>
                    <h2 className="text-2xl text-gray-600">0</h2>
                    <hr className="w-full border border-gray-300"/>
                    <h3>Players</h3>
                    <Link href={`/`} className="flex flex-row gap-1 link items-center">
                        <div className="flex w-8 h-8 aspect-square rounded-full bg-blue-600 text-white text-xl items-center justify-center">
                            <IoPeople/>
                        </div>
                        <label className="cursor-pointer">Sharkman</label>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}