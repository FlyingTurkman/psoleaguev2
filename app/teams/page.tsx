import { teamType, userType } from "@/types"
import PageView from "./PageView"
import { Teams } from "@/utils/mongodb/models"




type pageProps = {
    teams: teamType[],
    users: userType[]
}



export default async function Page() {
    const { teams, users }: { teams: teamType[], users: userType[] } = await getTeams()
    return(
        <div className="flex flex-col w-full items-center">
            <PageView initialTeams={teams} initialUsers={users}/>
        </div>
    )
}


export async function getTeams(): Promise<pageProps> {
    try {
        const resTeams = await fetch(`${process.env.appPath}/api/teamApi/getLastTeamsApi`, {
            method: 'POST',
            body: JSON.stringify({
                apiSecret: process.env.apiSecret
            }),
            cache: 'no-cache'
        })

        const { teams, users } = await resTeams.json()

        if (resTeams.status == 200) {
            return { teams, users }
        } else {
            return { teams: [], users: [] }
        }
    } catch (error) {
        console.log(error)
        return { teams: [], users: []}
    }
}

