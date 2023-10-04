import { teamType, userType, wallType } from "@/types";
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
        required: true,
        match: /[a-zA-Z0-9]/
    },
    teamUrl: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        rqeuired: true
    },
    coCaptain: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    dateTime: {
        type: Date,
        required: true
    }
})


export const wallSchema = new Schema<wallType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200
    },
    dateTime: {
        type: Date,
        required: true
    }
})