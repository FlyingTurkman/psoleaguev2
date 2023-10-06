'use client'
import { teamType } from "@/types";
import { imageLoader } from "@/utils/src/imageLoader";
import { teamAvatar } from "@/utils/src/teamImages";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { IoPeople } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { IoCalendarNumberSharp } from 'react-icons/io5'
import { TbPlayFootball } from 'react-icons/tb'
import { AiFillEdit } from 'react-icons/ai'







export default function TeamHeader({ team, teamUrl }: { team: teamType, teamUrl: string }) {
    const route = usePathname()
    return(
        <div className="flex flex-col">
            <div className="flex relative bg-blue-300 h-60 p-2 mb-20">
                <div className="flex flex-row gap-2 absolute bottom-0 items-end left-10 translate-y-1/2">
                    <div className="flex w-32 h-32 rounded-full aspect-square border-2 text-6xl text-white border-white bg-blue-600 items-center justify-center">
                        {team.avatar ? (
                            <Image
                            src={`${process.env.storagePath}/${teamAvatar(team._id.toString(), team.avatar)}`}
                            loader={imageLoader}
                            alt={team.teamName}
                            loading="lazy"
                            width={128}
                            height={128}
                            className="flex w-32 h-32 aspect-square rounded-full object-cover"
                            />
                        ): (
                            <IoPeople/>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h1>LasisX</h1>
                        <div className="flex flex-row gap-1">
                            <ReactCountryFlag countryCode="TR" svg/>
                            <label className="text-gray-600">Turkey</label> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-blue-600 p-2 gap-1 text-white items-center justify-center rounded">
                <Link href={`/teams/${teamUrl}/wall`} className={`${route.includes('wall') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                    <AiFillEdit/>
                </Link>
                <Link href={`/teams/${teamUrl}/calendar`} className={`${route.includes('calendar') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                    <IoCalendarNumberSharp/>
                </Link>
                <Link href={`/teams/${teamUrl}/players`} className={`${route.includes('players') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                    <IoPeople/>
                </Link>
                <Link href={`/teams/${teamUrl}/next-matches`} className={`${route.includes('next-matches') ? 'subMenuLinkActive' : 'subMenuLink'}`}>
                    <TbPlayFootball/>
                </Link>
            </div>
        </div>
        
    )
}