import { teamType, userType } from "@/types";
import PageView from "./PageView";








export default async function Page() {
    const { players, teams }: { players: userType[], teams: teamType[] } = await getPlayers()
    return(
        <div className="flex flex-col w-full items-center">
            <PageView initialPlayers={players} initialTeams={teams}/>
        </div>
    )
}

async function getPlayers() {
    try {
        const resPlayers = await fetch(`${process.env.appPath}/api/userApi/getLastUsersWithTeamsApi`, {
            method: 'POST',
            body: JSON.stringify({
                apiSecret: process.env.apiSecret
            }),
            cache: 'no-cache'
        })
        const res = await resPlayers.json()
        if (resPlayers.status == 200) {
            return res
        } else {
            return { players: [], teams: [] }
        }
    } catch (error) {
        console.log(error)
        return { players: [], teams: [] }
    }
}