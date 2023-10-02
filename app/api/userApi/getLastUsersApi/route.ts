import { userType } from "@/types";
import { Users } from "@/utils/mongodb/models";
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
        const users: userType[] = await Users.find({}, {
            password: 0,
            token: 0,
            email: 0
        }).sort({ dateTime: -1 }).limit(page * 20)
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}