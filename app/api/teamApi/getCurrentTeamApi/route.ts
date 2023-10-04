import { teamType } from "@/types";
import { Teams } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";



export async function POST(req: NextRequest) {
    const {
        apiSecret,
        teamId
    }: {
        apiSecret: string,
        teamId: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const team: teamType | null | undefined = await Teams.findOne({ _id: teamId })
        return NextResponse.json(team, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}