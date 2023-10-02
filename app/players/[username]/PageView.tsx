'use client'

import { teamType, userType } from "@/types"
import { imageLoader } from "@/utils/src/imageLoader"
import Image from "next/image"
import { IoPerson } from "react-icons/io5"







export default function PageView({ player, team }: { player: userType, team?: teamType | null | undefined }) {
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
                        <h1>{player.username}</h1>
                        <label className="text-gray-600 text-sm">Turkey</label>
                    </div>
                </div>
                <div className="flex flex-row-reverse absolute bottom-0 right-10 translate-y-1/2 gap-2">
                    <div className="flex w-32 h-32 rounded-full bg-blue-600 border-2 border-white">

                    </div>
                </div>
            </div>
        </div>
    )
}