import PlayerHeader from "@/components/players/PlayerHeader"
import { teamType, userType } from "@/types"
import { Teams, Users } from "@/utils/mongodb/models"
import { notFound } from "next/navigation"







type pageProps = {
    player: userType | null | undefined,
    team?: teamType | null | undefined
}



export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { username: string }}) {
    const { player, team }: { player: userType | null | undefined, team?: teamType | null | undefined } = await getPlayer(params.username)
    if (!player) {
        notFound()
    }
    return(
        <div>
            <PlayerHeader player={player} team={team}/>
            {children}
        </div>
    )
}


async function getPlayer(username: string): Promise<pageProps> {
    try {

        const user: userType | null | undefined = await Users.findOne({ username })

        if (!user) {
            return { player: undefined, team: undefined }
        }
        
        let team: teamType | null | undefined = null

        if (user.teamId) {
            team = await Teams.findOne({ _id: user.teamId })
        }

        return { player: JSON.parse(JSON.stringify(user)), team: JSON.parse(JSON.stringify(team)) }
    } catch (error) {
        console.log(error)
        return { player: undefined, team: undefined }
    }
}