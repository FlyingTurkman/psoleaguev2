import MyTeamContextProvider from "@/components/myTeam/MyTeamContextProvider";
import { teamType } from "@/types";
import { cookies } from "next/headers";
import React from "react";











export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    let team: teamType | null | undefined
    if (token) {
        team = await getMyTeam(token)
    }
    return(
        <MyTeamContextProvider initialTeam={null}>
            {children}
        </MyTeamContextProvider>
    )
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