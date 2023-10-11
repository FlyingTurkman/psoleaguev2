import { Users } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token
    }: {
        apiSecret: string,
        token?: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        await Users.updateOne({
            token
        }, {
            $set: {
                lastOnline: new Date()
            }
        })
        return NextResponse.json(true, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}