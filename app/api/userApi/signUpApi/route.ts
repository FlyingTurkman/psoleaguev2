import { userType } from "@/types";
import { Users } from "@/utils/mongodb/models";
import { NextResponse, type NextRequest } from "next/server";
import { uuid } from "uuidv4";
const md5 = require('md5')
import { ObjectId } from 'mongodb'
import { tokenGenerator } from "@/utils/src/tokenGenerator";
import { cookies } from 'next/headers'
import { tokenExpires } from "@/utils/src/constants";



export async function POST(req: NextRequest) {
    const {
        apiSecret,
        email,
        username,
        password,
        country,
        mainPosition,
        sidePosition
    }: {
        apiSecret: string,
        email: string,
        username: string,
        password: string,
        country: string,
        mainPosition: number,
        sidePosition: number
    } = await req.json()

    if (apiSecret != process.env.apiSecret) {
        return NextResponse.json('Connection failed', { status: 400 })
    }

    try {
        const emailCheck: userType | null | undefined = await Users.findOne({ email })

        if (emailCheck) {
            return NextResponse.json('You already have an account', { status: 400 })
        }

        const usernameCheck: userType | null | undefined = await Users.findOne({ username })

        if (usernameCheck) {
            return NextResponse.json('This username already taken', { status: 400 })
        }
        const token = tokenGenerator(username)
        const newUser: userType | null | undefined = await Users.create({
            _id: new ObjectId(),
            username,
            password: md5(password),
            token,
            country,
            mainPosition,
            sidePosition
        })
        if (newUser) {
            const cookieStore = cookies()
            cookieStore.set('token', token, { expires: Date.now() + tokenExpires })
            return NextResponse.redirect(`${process.env.appPath}`)
        } else {
            return NextResponse.json('An error has occured', { status: 400 })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json('An error has occured', { status: 400 })
    }
}