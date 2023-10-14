import { userType } from "@/types";
import { Queues, Users } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token,
        queueId
    }: {
        apiSecret: string,
        token: string,
        queueId: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const user: userType | null | undefined = await Users.findOne({ token })
        
        if (!user) {
            return NextResponse.json('User not found', { status: 400 })
        }

        const leaveQueue = await Queues.updateOne({
            _id: queueId
        }, {
            $pull: { players: user._id.toString() }
        })

        return NextResponse.json(true, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}