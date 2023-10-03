import { teamType, userType } from "@/types";
import { Schema } from "mongoose";





export const userSchema = new Schema<userType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    mainPosition: {
        type: Number,
        required: false
    },
    sidePosition: {
        type: Number,
        rqeuired: false
    },
    teamId: {
        type: String,
        required: false
    },
    dateTime: {
        type: Date,
        required: true
    }
})


export const teamSchema = new Schema<teamType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamTag: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    coCaptain: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
})