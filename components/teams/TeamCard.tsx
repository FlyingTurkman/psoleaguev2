'use client'
import { teamType, userType } from "@/types"
import { imageLoader } from "@/utils/src/imageLoader"
import { teamAvatar } from "@/utils/src/teamImages"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"
import { IoPeople } from "react-icons/io5"
import countries from '../../utils/src/countries.json'
import Link from "next/link"
import { FaCrown, FaCopyright } from 'react-icons/fa'





export default function TeamCard({ team, owner, captain, coCaptain }: { team: teamType, owner?: userType | null | undefined, captain?: userType | null | undefined, coCaptain?: userType | null | undefined }) {
    return(
        <div className="flex flex-row mx-auto gap-2 max-w-2xl w-full bg-white p-2 rounded-xl border-gray-300 border">
            <Link href={`/teams/${team.teamUrl}`} className="flex flex-col w-32 h-32 aspect-square rounded-full">
                {team.avatar ? (
                    <Image
                    src={`${process.env.storagePath}/${teamAvatar(team._id.toString(), team.avatar)}`}
                    alt={team.teamName}
                    loader={imageLoader}
                    width={128}
                    height={128}
                    className="w-full h-full aspect-square rounded-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center bg-blue-600 text-white text-8xl">
                        <IoPeople/>
                    </div>
                )}
            </Link>
            <div className="flex flex-row gap-2 flex-1 p-2 justify-between">
                <Link href={`/teams/${team.teamUrl}`} className="flex flex-col basis-1/2 justify-center">
                    <label className="cursor-pointer text-xl font-semibold">
                        [{team.teamTag}]: {team.teamName}
                    </label>
                    <div className="flex flex-row gap-2 items-center text-gray-600 cursor-pointer">
                        <ReactCountryFlag countryCode={team.country} svg/>
                        {countries.find((country) => country.code == team.country)?.name}
                    </div>
                </Link>
                <div className="flex flex-col basis-1/2 justify-center">
                    {owner && (
                        <Link href={`/players/${owner.username}`} className="flex flex-row gap-2 text-lg link items-center">
                            <FaCrown/>
                            <label className="cursor-pointer">{owner.username}</label>
                        </Link>
                    )}
                    {captain && (
                        <Link href={`/players/${captain.username}`} className="flex flex-row gap-2 text-lg link items-center">
                            <FaCopyright/>
                            <label className="cursor-pointer">{captain.username}</label>
                        </Link>
                    )}
                    {coCaptain && (
                        <Link href={`/players/${coCaptain.username}`} className="flex flex-row gap-2 text-lg link items-center">
                            <FaCopyright/>
                            <label className="cursor-pointer">{coCaptain.username}</label>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}