import MyTeamContextProvider from "@/components/myTeam/MyTeamContextProvider";
import { teamType } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { IoPeople, IoShirt } from "react-icons/io5";










export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    let team: teamType | null | undefined
    if (token) {
        team = await getMyTeam(token)
    }
    if (team) {
        return(
            <MyTeamContextProvider initialTeam={team}>
                {children}
            </MyTeamContextProvider>
        )
    } else {
        return(
            <MyTeamContextProvider initialTeam={team}>
                <div className="w-full flex flex-col h-screen items-center justify-center text-xl font-semibold">
                    <div className="flex flex-row">
                        <Link href={'/my-team/create'} className="flex flex-row gap-2 p-2 rounded-l bg-blue-600 text-white items-center">
                            <IoShirt/>
                            <label className="cursor-pointer">Create a team</label>
                        </Link>
                        <Link href={'/teams'} className="flex flex-row gap-2 p-2 rounded-r bg-white text-blue-600 items-center">
                            <label className="cursor-pointer">Join a team</label>
                            <IoPeople/>
                        </Link>
                    </div>
                </div>
            </MyTeamContextProvider>
        )
    }

}

async function getMyTeam(token: string): Promise<teamType | null | undefined> {
    try {
        const resTeam = await fetch(`${process.env.appPath}/api/teamApi/getMyTeamApi`, {
            method: 'POST',
            body: JSON.stringify({
                apiSecret: process.env.apiSecret,
                token
            }),
            cache: 'no-cache'
        })

        const res = await resTeam.json()

        if (resTeam.status == 200) {
            return res
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}