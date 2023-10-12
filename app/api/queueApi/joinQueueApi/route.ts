import { queueType, userType } from "@/types";
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

        const queue: queueType | null | undefined = await Queues.findOne({ _id: queueId })

        if (!queue) {
            return NextResponse.json('Queue not found', { status: 400 })
        }

        try {
            await Queues.updateOne({
                players: { $in: user._id.toString() }
            }, {
                $pull: {
                    players: user._id.toString()
                }
            })
        } catch (error) {
            console.log(error)
        }

        const queueUpdate = await Queues.updateOne({
            _id: queueId
        }, { 
            $addToSet: {
                players: user._id.toString()
            }
        })


        if (queueUpdate.matchedCount == 0) {
            return NextResponse.json('An error has occured', { status: 400 })
        }

        return NextResponse.json(true, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', {status: 400 })
    }
}