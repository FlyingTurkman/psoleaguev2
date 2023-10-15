import { lobbyType, userType } from "@/types";
import { Lobbies, Users } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token,
        lobbyId
    }: {
        apiSecret: string,
        token: string,
        lobbyId: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const user: userType | null | undefined = await Users.findOne({ token })

        if (!user) {
            return NextResponse.json('Please login', { status: 400 })
        }

        const lobby: lobbyType | null | undefined = await Lobbies.findOne({ _id: lobbyId })

        if (!lobby) {
            return NextResponse.json('Lobby does not exist', { status: 400 })
        }

        let isPlayerInLobby = false

        for (const player of lobby.players) {
            if (player.playerId == user._id.toString()) {
                isPlayerInLobby = true
            }
        }

        if (!isPlayerInLobby) {
            return NextResponse.json('You have no permission for this action', { status: 400 })
        }

        const dateTime = new Date()

        if (new Date(lobby.acceptDeadline) < dateTime) {
            return NextResponse.json('No time left to join lobby', { status: 400 })
        }

        await Lobbies.updateOne({
            _id: lobbyId,
            players: {
                $elemMatch: { playerId: user._id.toString() }
            }
        }, {
            $set: {
                'players.$.accepted': true
            }
        })

        return NextResponse.json(true, { status: 400 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}