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
        return NextResponse.json('Connection failed.', { status: 400 })
    }

    try {
        const teams: teamType[] = await Teams.find({}).sort({ dateTime: -1 }).limit(page * 20)
        const ownerIds: string[] = teams.map((team) => {
            return team.owner
        })
        const captainIds: string[] = teams.map((team) => {
            return team.captain || new ObjectId().toString()
        })
        const coCaptainIds: string[] = teams.map((team) => {
            return team.coCaptain || new ObjectId().toString()
        })

        const userIds: string[] = ownerIds.concat(captainIds).concat(coCaptainIds)
        const users: userType[] = await Users.find({
            _id: { $in: userIds } 
        }, {
            token: 0,
            email: 0,
            password: 0
        })
        return NextResponse.json({ teams, users }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}