import { teamType, userType } from "@/types";
import { uploadFile } from "@/utils/firebase/uploadFile";
import { Teams, Users } from "@/utils/mongodb/models";
import { teamAvatar } from "@/utils/src/teamImages";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";






export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token,
        teamName,
        teamTag,
        teamUrl,
        country,
        image,
        imageDataUrl
    }: {
        apiSecret: string,
        token: string,
        teamName: string,
        teamTag: string,
        teamUrl: string,
        country: string,
        image?: string,
        imageDataUrl: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const user: userType | null | undefined = await Users.findOne({ token })

        if (!user) {
            return NextResponse.json('Please login', { status: 400 })
        }

        if (user.teamId) {
            return NextResponse.json('You must leave from your team', { status: 400 })
        }

        const createTeam: teamType | null | undefined = await Teams.create({
            _id: new ObjectId(),
            teamName,
            teamUrl,
            teamTag,
            owner: user._id.toString(),
            captain: user._id.toString(),
            country,
            avatar: image,
            dateTime: new Date()
        })

        if (!createTeam) {
            return NextResponse.json('An error has occured', { status: 400 })
        }

        await Users.updateOne({
            _id: new ObjectId(user._id.toString())
        }, {
            $set: { teamId: createTeam._id.toString() }
        })

        if (image && imageDataUrl) {
            await uploadFile({file: imageDataUrl, filePath: teamAvatar(createTeam._id.toString(), image), metaData: image.split('.')[1]})
        }

        return NextResponse.json(createTeam._id.toString(), { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}