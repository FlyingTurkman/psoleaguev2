import { teamType, userType } from "@/types";
import { Teams, Users } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        username
    }: {
        apiSecret: string,
        username: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const player: userType | null | undefined = await Users.findOne({ username }, {
            password: 0,
            token: 0,
            email: 0
        })
        if (!player) {
            return NextResponse.json('Player not found', { status: 404 })
        }
        let team: teamType | null | undefined = undefined
        if (player.teamId) {
            team = await Teams.findOne({ _id: new ObjectId(player.teamId )})
        }

        return NextResponse.json({ player, team }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}