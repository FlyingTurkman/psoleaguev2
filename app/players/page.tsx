import { userType } from "@/types";
import PageView from "./PageView";








export default async function Page() {
    const players: userType[] = await getPlayers()
    return(
        <div className="flex flex-col w-full items-center">
            <PageView initialPlayers={players}/>
        </div>
    )
}

async function getPlayers(): Promise<userType[]> {
    try {
        const resPlayers = await fetch(`${process.env.appPath}/api/userApi/getLastUsersApi`, {
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
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}