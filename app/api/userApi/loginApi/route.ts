import { userType } from "@/types";
import { Users } from "@/utils/mongodb/models";
import { tokenExpires } from "@/utils/src/constants";
import { tokenGenerator } from "@/utils/src/tokenGenerator";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
const md5 = require('md5')



export async function POST(req: NextRequest) {
    const {
        apiSecret,
        username,
        password
    }: {
        apiSecret: string,
        username: string,
        password: string
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const user: userType | null | undefined = await Users.findOne({
            $and: [
                { username },
                { password: md5(password) }
            ]
        })
        
        if (!user) {
            return NextResponse.json('Wrong credentials', { status: 400 })
        } 
        
        const newToken = tokenGenerator(user._id.toString())

        const tokenUpdate = await Users.updateOne({ _id: new ObjectId(user._id.toString()) }, {
            $set: { token: newToken }
        })

        if (tokenUpdate.matchedCount > 0) {
            const cookieStore = cookies()
            cookieStore.set('token', newToken, { expires: Date.now() + tokenExpires })
        } else {
            const cookieStore = cookies()
            cookieStore.set('token', user.token, { expires: Date.now() + tokenExpires })
        }

        return NextResponse.json(true, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}