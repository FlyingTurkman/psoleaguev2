'use client'
import { MyTeamPageContext } from "@/context/myTeamPageContext"
import { myTeamPageContextType } from "@/types"
import Link from "next/link"
import { useContext } from "react"
import { IoPeople, IoShirt } from "react-icons/io5"





export default function PageView() {
    const { team }: myTeamPageContextType = useContext(MyTeamPageContext)
    if (!team) {
        return(
            <div className="flex w-full h-screen items-center justify-center">
                <div className="flex flex-row">
                    <Link href={'/my-team/create'} className="flex flex-row items-center text-xl p-2 bg-blue-600 text-white rounded-l gap-2">
                        <IoShirt/>
                        <label className="cursor-pointer">Create a team</label>
                    </Link>
                    <Link href={'/teams'} className="flex flex-row items-center text-xl p-2 bg-white text-blue-600 rounded-l gap-2">
                        <label className="cursor-pointer">Join a team</label>
                        <IoPeople/>
                    </Link>
                </div>
            </div>
        )
    } else {
        return(
            <div>

            </div>
        )
    }
}