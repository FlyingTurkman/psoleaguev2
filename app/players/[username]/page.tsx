import { teamType, userType } from "@/types";
import PageView from "./PageView";
import { notFound } from "next/navigation";






type pageProps = {
    player: userType | null | undefined,
    team?: teamType | null | undefined
}





export default async function Page({ params }: { params: { username: string } }) {
    const { player, team }: { player: userType | null | undefined, team?: teamType | null | undefined } = await getPlayer(params.username)
    if (!player) {
        notFound()
    }
    return(
        <div>
            <PageView player={player} team={team}/>
        </div>
    )
}


async function getPlayer(username: string): Promise<pageProps> {
    try {
        const resData = await fetch(`${process.env.appPath}/api/userApi/getPlayerByUsernameApi`, {
            method: 'POST',
            body: JSON.stringify({
                apiSecret: process.env.apiSecret,
                username
            })
        })

        const { player, team } = await resData.json()

        if (resData.status == 200) {
            return { player, team }
        } else {
            return { player: undefined, team: undefined }
        }
    } catch (error) {
        console.log(error)
        return { player: undefined, team: undefined }
    }
}