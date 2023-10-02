import { teamType } from "@/types"
import PageView from "./PageView"









export default async function Page() {
    const teams: teamType[] = await getTeams()
    return(
        <div>
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
            })
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