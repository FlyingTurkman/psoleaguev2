import { userType } from "@/types";
import { Teams, Users } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";




export async function POST(req: NextRequest) {
    const {
        apiSecret,
        username,
        page = 1
    }: {
        apiSecret: string,
        username: string,
        page?: number
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const players: userType[] = await Users.find({
            username: new RegExp(username, 'i')
        }, {
            email: 0,
            password: 0,
            token: 0
        }).limit(20 * page)

        const teamIds: ObjectId[] = players.filter((p) => p.teamId).map((player) => {
            return new ObjectId(player.teamId || '')
        })

        const teams = await Teams.find({
            _id: { $in: teamIds }
        })

        return NextResponse.json({ players, teams }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}