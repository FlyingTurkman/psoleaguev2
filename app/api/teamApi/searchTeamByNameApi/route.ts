import { teamType } from "@/types";
import { Teams } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";







export async function POST(req: NextRequest) {
    const {
        apiSecret,
        teamName,
        page = 1
    }: {
        apiSecret: string,
        teamName: string,
        page?: number
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed.', { status: 400 })
    }

    try {
        const teams: teamType[] = await Teams.find({ teamName: new RegExp(teamName, 'i') }).limit(page * 20)
        return NextResponse.json(teams, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured.', { status: 400 })
    }
}