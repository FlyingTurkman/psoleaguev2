import { teamType, userType } from "@/types"
import { Teams, Users } from "@/utils/mongodb/models"
import PageView from "./PageView"
import { notFound } from "next/navigation"




type pageProps = {
    team?: teamType,
    players?: userType[],
    notFound: boolean,
    ownerId?: string,
    captainId?: string,
    coCaptainId?: string
}



export default async function Page({ params }: { params: { teamUrl: string } }) {
    /* TODO: gereksiz propsları sil */
    const { team, players, notFound: pagenNotFound, ownerId, captainId, coCaptainId }: pageProps = await getPlayers(params.teamUrl)
    if (pagenNotFound) {
        notFound()
    }
    return(
        <div>
            <PageView team={team} players={players}/>
        </div>
    )
}




async function getPlayers(teamUrl: string): Promise<pageProps> {
    try {
        const team: teamType | null | undefined = await Teams.findOne({ teamUrl })

        if (!team) {
            return { players: [], notFound: true }
        }

        let playerIds: string[] = []

        if (team.owner) playerIds.push(team.owner)
        if (team.captain && !playerIds.includes(team.captain)) playerIds.push(team.captain)
        if (team.coCaptain && !playerIds.includes(team.coCaptain)) playerIds.push(team.coCaptain)
        let players: userType[] = await Users.find({
            _id: { $in: playerIds }
        }, {
            token: 0,
            password: 0,
            email: 0
        })

        const teamPlayers: userType[] = await Users.find({ teamId: team._id.toString() })
        for (const player of teamPlayers) {
            if (!playerIds.includes(player._id.toString())) {
                teamPlayers.push(player)
            }
        }
        return { team: JSON.parse(JSON.stringify(team)), players: JSON.parse(JSON.stringify(players)), notFound: false, ownerId: team.owner, captainId: team.captain, coCaptainId: team.coCaptain }
    } catch (error) {
        console.log(error)
        return { players: [], notFound: true }
    }
}