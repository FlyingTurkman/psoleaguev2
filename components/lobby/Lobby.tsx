import { lobbyType, userType } from "@/types";
import LobbyView from "./LobbyView";
import { Users } from "@/utils/mongodb/models";












export default async function Lobby({ initialLobby, token }: { initialLobby: lobbyType | null | undefined, token?: string }) {
    const playerIds: string[] = []
    let players: userType[] = []
    if (initialLobby?.players) {
        for (const player of initialLobby?.players) {
            if (!playerIds.includes(player.playerId)){
                playerIds.push(player.playerId)
            }
        }
        players = await getUsers(playerIds)
    }

    return(
        <div>
            <LobbyView initialLobby={initialLobby} token={token} players={players}/>
        </div>
    )
}


async function getUsers(playerIds: string[]): Promise<userType[]> {
    try {
        const players: userType[] = await Users.find({
            _id: { $in: playerIds }
        }, {
            _id: 1,
            username: 1,
            country: 1,
            mainPosition: 1,
            sidePosition: 1,
            avatar: 1
        })
        return JSON.parse(JSON.stringify(players))
    } catch (error) {
        console.log(error)
        return []
    }
}