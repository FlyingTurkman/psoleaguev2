import { teamType, userType, wallType } from "@/types";
import { Teams, Users, Walls } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";








export async function POST(req: NextRequest) {
    const {
        apiSecret,
        teamUrl,
        playerUrl,
        page = 1
    }: {
        apiSecret: string,
        teamUrl?: string,
        playerUrl?: string,
        page?: number
    } = await req.json()


    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        let team: teamType | null | undefined
        let player: userType | null | undefined
        if (teamUrl) {
            team = await Teams.findOne({ teamUrl })
        }
        if (playerUrl) {
            player = await Users.findOne({ username: playerUrl })
        }

        if (!team && !player) {
            return NextResponse.json('Wall not found')
        }
        let posts: wallType[] = []
        if (team) {
            posts = await Walls.find({ to: team._id.toString() }).sort({ dateTime: -1 }).limit(20 * page)
        }
        if (player) {
            posts = await Walls.find({ to: player._id.toString() })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}