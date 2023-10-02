import { teamType, userType } from "@/types";
import { Teams, Users } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";





export async function POST(req: NextRequest) {
    const {
        apiSecret,
        page = 1
    }: {
        apiSecret: string,
        page?: number
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const players: userType[] = await Users.find({}, {
            password: 0,
            token: 0,
            email: 0
        }).sort({ dateTime: -1 }).limit(page * 20)

        const teamIds: ObjectId[] | null = players.filter((p) => p.teamId).map((user) => {
            return new ObjectId(user.teamId || '')

        })


        const teams: teamType[] = await Teams.find({
            _id: { $in: teamIds }
        })

        
        return NextResponse.json({ players, teams }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}