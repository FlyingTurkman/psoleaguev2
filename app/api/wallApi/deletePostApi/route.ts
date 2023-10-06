import { teamType, userType, wallType } from "@/types";
import { Teams, Users, Walls } from "@/utils/mongodb/models";
import { ObjectId } from "bson";
import { NextResponse, type NextRequest } from "next/server";





export async function POST(req: NextRequest) {
    const {
        apiSecret,
        token,
        postId
    }: {
        apiSecret: string,
        token: string,
        postId: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const user: userType | null | undefined = await Users.findOne({ token })
        if (!user) {
            return NextResponse.json('You must logged in', { status: 400 })
        }

        const post: wallType | null | undefined = await Walls.findOne({ _id: postId })

        if (!post) {
            return NextResponse.json('Post not found', { status: 400 })
        }

        if (user._id.toString() == post.from || user._id.toString() == post.to) {
            const deletePost = await Walls.deleteOne({ _id: postId })
            if (deletePost.deletedCount > 0) {
                return NextResponse.json('Post succesfully deleted', { status: 200 })
            } else {
                return NextResponse.json('An error has occured', { status: 400})
            }
        }

        if (!user.teamId) {
            return NextResponse.json('You have no permission to delete this post', { status: 400 })
        }
        const team: teamType | null | undefined  = await Teams.findOne({ _id: user.teamId })
        
        if (!team) {
            return NextResponse.json('You have no permission to delete this post', { status: 400 })
        }

        if (team.owner == user._id.toString() || team.captain == user._id.toString() || team.coCaptain == user._id.toString()) {
            if (team._id.toString() == post.to) {
                const deletePost = await Walls.deleteOne({ _id: postId })
                if (deletePost.deletedCount > 0) {
                    return NextResponse.json('Post succesfully deleted', { status: 200 })
                } else {
                    return NextResponse.json('An error has occured', { status: 400})
                }
            }
        }
        return NextResponse.json('You have no permission to delete this post', { status: 400 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}