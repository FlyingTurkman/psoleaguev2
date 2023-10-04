import TeamHeader from "@/components/teams/TeamHeader";
import { teamType } from "@/types";
import { Teams } from "@/utils/mongodb/models";
import { notFound } from "next/navigation";
import React from "react";










export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { teamUrl: string } }) {
    const team: teamType | null | undefined = await getTeam(params.teamUrl)
    if (!team) {
        notFound()
    }
    return(
        <div>
            <TeamHeader team={team}/>
            {children}
        </div>
    )
}


async function getTeam(teamUrl: string): Promise<teamType | null | undefined> {
    try {
        const team: teamType | null | undefined = await Teams.findOne({ teamUrl })
        if (team) {
            return JSON.parse(JSON.stringify(team))
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}