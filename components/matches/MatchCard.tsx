'use client'

import { teamType, userType } from "@/types"
import { imageLoader } from "@/utils/src/imageLoader"
import { teamAvatar } from "@/utils/src/teamImages"
import { userAvatar } from "@/utils/src/userImages"
import Image from "next/image"
import Link from "next/link"
import { IoPeople } from "react-icons/io5"












export default function MatchCard({ homeTeam, awayTeam, homePlayers, awayPlayers, matchTime, homeScore, awayScore }: { homeTeam?: teamType | undefined, awayTeam?: teamType | undefined, homePlayers?: userType[], awayPlayers?: userType[], matchTime?: Date, homeScore?: number, awayScore?: number }) {
    return(
        <div className="flex flex-col max-w-2xl w-full mx-auto my-1 gap-2 p-2 bg-slate-100 rounded border border-gray-300">
            {/* TODO: Ligler kurulunca linkleri güncelle */}
            <Link href={`/`} className="link">
                <label className="flex text-2xl cursor-pointer font-bold mx-auto items-center justify-center text-center">Türkiye 1. Ligi</label>
            </Link>
            <label className="text-center">{new Date(matchTime?? '').toLocaleString()}</label>
            <hr className="w-full border border-gray-300"/>
            <div className="flex flex-row">
                <div className="flex flex-col basis-1/2 gap-2 p-2 items-center border-r-gray-300 border-r">
                    <div className="flex h-40 w-40 rounded-full items-center justify-center text-8xl text-white bg-blue-600">
                        {homeTeam?.avatar? (
                            <Image
                            src={`${process.env.storagePath}/${teamAvatar(homeTeam._id.toString(), homeTeam.avatar)}`}
                            alt={homeTeam.teamName}
                            loader={imageLoader}
                            width={240}
                            height={240}
                            className="flex w-full h-full aspect-square rounded-full object-cover"
                            />
                        ): (
                            <IoPeople/>
                        )}
                        
                    </div>
                    <Link href={`/teams/${homeTeam?.teamUrl}`} className="link">
                        <h1 className="text-2xl">{homeTeam?.teamName?? 'Deleted Team'}</h1>
                    </Link>
                    <h2 className="text-2xl text-gray-600">{homeScore?? '0'}</h2>
                    <hr className="w-full border border-gray-300"/>
                    <h3>Players</h3>
                    <hr className="w-full border border-gray-300"/>
                    {homePlayers?.map((player) => {
                        return(
                            <Link href={`/`} className="flex flex-row gap-1 link items-center">
                                <div className="flex w-8 h-8 aspect-square rounded-full bg-blue-600 text-white text-xl items-center justify-center">
                                    {player?.avatar? (
                                        <Image
                                        src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player.avatar)}`}
                                        alt={player.username}
                                        loader={imageLoader}
                                        width={32}
                                        height={32}
                                        className="flex w-full h-full aspect-square rounded-full object-cover"
                                        />
                                    ): (
                                        <IoPeople/>
                                    )}
                                </div>
                                <label className="cursor-pointer">{player?.username?? 'Deleted User'}</label>
                            </Link>
                        )
                    })}
                </div>
                <div className="flex flex-col basis-1/2 gap-2 p-2 items-center border-r-gray-300 border-r">
                    <div className="flex h-40 w-40 rounded-full items-center justify-center text-8xl text-white bg-blue-600">
                        {awayTeam?.avatar? (
                            <Image
                            src={`${process.env.storagePath}/${teamAvatar(awayTeam._id.toString(), awayTeam.avatar)}`}
                            alt={awayTeam.teamName}
                            loader={imageLoader}
                            width={240}
                            height={240}
                            className="flex w-full h-full aspect-square rounded-full object-cover"
                            />
                        ): (
                            <IoPeople/>
                        )}
                        
                    </div>
                    <Link href={`/teams/${awayTeam?.teamUrl}`} className="link">
                        <h1 className="text-2xl">{awayTeam?.teamName?? 'Deleted Team'}</h1>
                    </Link>
                    <h2 className="text-2xl text-gray-600">{awayScore?? '0'}</h2>
                    <hr className="w-full border border-gray-300"/>
                    <h3>Players</h3>
                    <hr className="w-full border border-gray-300"/>
                    {awayPlayers?.map((player) => {
                        return(
                            <Link href={`/`} className="flex flex-row gap-1 link items-center">
                                <div className="flex w-8 h-8 aspect-square rounded-full bg-blue-600 text-white text-xl items-center justify-center">
                                    {player?.avatar? (
                                        <Image
                                        src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player.avatar)}`}
                                        alt={player.username}
                                        loader={imageLoader}
                                        width={32}
                                        height={32}
                                        className="flex w-full h-full aspect-square rounded-full object-cover"
                                        />
                                    ): (
                                        <IoPeople/>
                                    )}
                                </div>
                                <label className="cursor-pointer">{player?.username?? 'Deleted User'}</label>
                            </Link>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}