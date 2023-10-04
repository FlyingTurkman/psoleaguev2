import { userType, wallType } from "@/types";
import { Users, Walls } from "@/utils/mongodb/models";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token,
        to,
        content
    }: {
        apiSecret: string,
        token: string,
        to: string,
        content: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const dateTime = new Date()

        const user: userType | null | undefined = await Users.findOne({ token })

        if (!user) {
            return NextResponse.json('You must logged in', { status: 400 })
        }

        const lastWalls: wallType[] = await Walls.find({
            $and: [
                { from: user._id.toString() },
                { to }
            ]
        }).sort({ dateTime: -1 }).limit(1)
        if (lastWalls.length > 0) {
            if (new Date(lastWalls[0].dateTime) > new Date(dateTime.setHours(dateTime.getHours() - 1))) {
                return NextResponse.json("You can send only 1 post per hour", { status: 400 })
            }
        }

        const newPost: wallType | null | undefined = await Walls.create({
            _id: new ObjectId(),
            from: user._id.toString(),
            to,
            content,
            dateTime: new Date()
        })

        if (newPost) {
            return NextResponse.json(true, { status: 200 })
        } else {
            return NextResponse.json('An error has occured', { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}