'use client'
import { teamType, userType } from "@/types";
import { teamAvatar } from "@/utils/src/teamImages";
import { imageLoader } from "@/utils/src/imageLoader";
import Image from "next/image"
import Link from "next/link"
import { IoPeople, IoPerson } from "react-icons/io5"
import { AiFillEdit } from "react-icons/ai";
import { usePathname } from "next/navigation";








export default function PlayerHeader({ player, team }: { player: userType, team?: teamType | null | undefined}) {
    const route = usePathname()
    return(
        <div className="flex flex-col gap-2">
            <div className="flex relative h-60 bg-blue-300">
                <div className="flex flex-row absolute bottom-0 left-10 translate-y-1/2 gap-2">
                    <div className="flex w-32 h-32 rounded-full bg-blue-600 border-2 border-white text-6xl items-center justify-center text-white">
                        {player.avatar && (
                            <Image
                            src={`${process.env.storagePath}/players/${player._id.toString()}/avatar/${player.avatar}`}
                            alt={player.username}
                            width={128}
                            height={128}
                            className="rounded-full w-full h-full aspect-square"
                            loader={imageLoader}
                            />
                        )}
                        {!player.avatar && (
                            <IoPerson/>
                        )}
                    </div>
                    <div className="mt-auto">
                        <h1 className="cursor-default">{player.username}</h1>
                        <label className="text-gray-600 text-sm">Turkey</label>
                    </div>
                </div>
                <div className="flex flex-row-reverse absolute bottom-0 right-10 translate-y-1/2 gap-2">
                    <div className="flex w-32 h-32 rounded-full bg-blue-600 border-2 items-center justify-center text-6xl text-white border-white">
                        {team && team.avatar? (
                            <Image
                            src={`${process.env.storagePath}/${teamAvatar(team._id.toString(), team.avatar)}`}
                            loader={imageLoader}
                            alt={team.teamName}
                            width={128}
                            height={128}
                            className="flex w-full h-full object-cover aspect-square rounded-full"
                            />
                        ): (
                            <IoPeople/>
                        )}
                    </div>
                    <div className="mt-auto">
                        <Link className="link" href={`/team/${team?.teamUrl}`}>
                            <h1>{team?.teamName?? 'Free Agent'}</h1>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-blue-600 p-2 gap-1 mt-16 text-white items-center justify-center rounded">
                <Link href={`/players/${player.username}/wall`} className={`${route.includes('wall') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                    <AiFillEdit/>
                </Link>
            </div>
        </div>
    )
}