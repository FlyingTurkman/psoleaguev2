import { teamType, userType } from "@/types";
import { Teams, Users } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token
    }: {
        apiSecret: string,
        token: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed')
    }

    try {
        const user: userType | null | undefined = await Users.findOne({ token })

        if (!user) {
            return NextResponse.json('User not found', { status: 400 })
        }

        if (!user.teamId) {
            return NextResponse.json(null, { status: 200 })
        }
        const team: teamType | null | undefined = await Teams.findOne({ _id: new ObjectId(user.teamId) })

        return NextResponse.json(team, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(undefined, { status: 400 })
    }
}