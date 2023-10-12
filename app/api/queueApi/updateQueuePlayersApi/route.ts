import { queueType, userType } from "@/types";
import { Queues, Users } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";







export async function POST(req: NextRequest) {
    const {
        apiSecret,
        queueId
    }: {
        apiSecret: string,
        queueId: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const queue: queueType | null | undefined = await Queues.findOne({ _id: queueId })

        if (!queue) {
            return NextResponse.json('Queue not found', { status: 400 })
        }

        if (!queue.players || queue.players?.length == 0) {
            return NextResponse.json('Queue has no player', { status: 200 })
        }
        let dateTime = new Date()
        dateTime.setSeconds(dateTime.getSeconds() - 30)
        const playerIds: string[] = queue.players.map((player) => {
            return player
        })

        const players: userType[] = await Users.find({
            $and: [
                { _id: { $in: playerIds } },
                { lastOnline: { $gt: dateTime } }
            ]
        })

        const onlinePlayerIds: string[] = players.map((player) => {
            return player._id.toString()
        })
        
        await Queues.updateOne({
            _id: queueId
        }, {
            $set: {
                players: onlinePlayerIds
            }
        })

        console.log('queue updated', new Date().toLocaleString('tr-TR'))
        return NextResponse.json(true, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}