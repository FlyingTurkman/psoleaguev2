import { teamType } from "@/types"
import PageView from "./PageView"








export default async function Page() {
    const teams: teamType[] = await getTeams()
    return(
        <div className="flex flex-col w-full items-center">
            <PageView initialTeams={teams}/>
        </div>
    )
}


export async function getTeams(): Promise<teamType[]> {
    try {
        const resTeams = await fetch(`${process.env.appPath}/api/teamApi/getLastTeamsApi`, {
            method: 'POST',
            body: JSON.stringify({
                apiSecret: process.env.apiSecret
            }),
            cache: 'no-cache'
        })

        const res = await resTeams.json()

        if (resTeams.status == 200) {
            return res
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}