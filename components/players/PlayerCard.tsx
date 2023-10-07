
import { teamType, userType } from "@/types";
import { IoPeople, IoPerson } from "react-icons/io5";
import { RiTeamFill } from 'react-icons/ri'
import Image from "next/image";
import { imageLoader } from "@/utils/src/imageLoader";
import ReactCountryFlag from "react-country-flag";
import countries from '../../utils/src/countries.json'
import { positionLists } from "@/utils/src/positionLists";
import Link from "next/link";
import { BiBlock } from 'react-icons/bi'
import { teamAvatar } from "@/utils/src/teamImages";




export default function PlayerCard({ player, team }: { player: userType, team?: teamType }) {

    return(
        <div className="flex flex-row mx-auto max-w-2xl w-full items-center justify-between bg-white rounded-xl p-2 border border-gray-300 gap-2">
            <Link href={`/players/${player.username}`} className="flex flex-row basis-1/2 gap-2">
                <div className="flex flex-shrink-0 aspect-square w-32 h-32 rounded-full bg-blue-600 text-white text-8xl items-center justify-center">
                    {player.avatar && (
                        <Image
                        src={`${process.env.storagePath}/players/${player._id.toString()}/${player.avatar}`}
                        alt={player.username}
                        loader={imageLoader}
                        width={300}
                        height={300}
                        className="w-full h-full aspect-square rounded-full"
                        />
                    )}
                    {!player.avatar && (
                        <IoPerson/>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <label className="text-lg font-semibold cursor-pointer">{player.username}</label>
                    <div className="flex flex-row items-center gap-1 text-gray-600">
                        <ReactCountryFlag countryCode={countries.find((c) => c.name == player.country)?.code || ''} svg/>
                        <label className="cursor-pointer">{player.country}</label>
                    </div>
                    <div className="flex flex-row gap-1">
                        <label className="flex bg-green-600 p-1 w-8 h-8 rounded-full text-white items-center justify-center text-xs cursor-pointer">{positionLists.find((p) => p.id == player.mainPosition)?.position}</label>
                        <label className="flex bg-green-600 p-1 w-8 h-8 rounded-full text-white items-center justify-center text-xs cursor-pointer">{positionLists.find((p) => p.id == player.sidePosition)?.position}</label>
                    </div>
                </div>
            </Link>
            <Link href={`team/${team?._id.toString()}`} className="flex flex-row-reverse basis-1/2 border-l border-l-gray-300 px-2 gap-2">
                <div className="flex flex-shrink-0 aspect-square w-32 h-32 rounded-full bg-blue-600 p-2 text-8xl items-center justify-center text-white">
                    {!team && (
                        <BiBlock/>
                    )}
                    {team && team.avatar && (
                        <Image
                        src={`${process.env.storagePath}/${teamAvatar(team._id.toString(), team.avatar)}`}
                        alt={team.teamName}
                        loading="lazy"
                        loader={imageLoader}
                        width={300}
                        height={300}
                        className="w-full h-full aspect-square rounded-full"
                        />
                    )}
                    {team && !player.avatar && (
                        <IoPeople/>
                    )}
                    
                </div>
                <div className="flex flex-col justify-center">
                    <label className="text-lg font-semibold cursor-pointer">
                        {team? (
                            team.teamName
                        ): 'Free Agent'}
                    </label>
                    {team && (
                        <div className="flex flex-row items-center gap-1 text-gray-600">
                            <ReactCountryFlag countryCode={team.country} svg/>
                            <label className="cursor-pointer">{team.country}</label>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    )
}