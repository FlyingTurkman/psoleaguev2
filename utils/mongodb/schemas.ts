import { lobbyType, matchType, queueType, teamType, userType, wallType } from "@/types";
import { Schema } from "mongoose";
import { matchAwayWin, matchCanceled, matchDraw, matchHomeWin, matchNotPlayed, matchPlaying, matchResultWaiting } from "../src/constants";





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
    elo: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    lastOnline: {
        type: Date,
        required: false
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


export const matchSchema = new Schema<matchType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    home: {
        teamId: {
            type: String,
            required: false
        },
        players: [String],
        score: {
            type: Number,
            required: false
        },
        captain: {
            type: String,
            required: false
        }
    },
    away: {
        teamId: {
            type: String,
            required: false
        },
        players: [String],
        score: {
            type: Number,
            required: false
        },
        captain: {
            type: String,
            required: false
        }
    },
    result: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    dateTime: Date
})



/* export const queueSchema = new Schema<queueType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    queueName: {
        type: String,
        required: true
    },
    queueUrl: {
        type: String,
        required: true
    },
    minElo: {
        type: Number,
        required: true
    },
    players: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                required: true
            },
            playerId: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            mainPosition: {
                type: Number,
                required: true
            },
            sidePosition: {
                type: Number,
                required: true
            },
            elo: {
                type: Number,
                required: true
            },
            lastPing: {
                type: Date,
                required: true
            }
        }
    ]
}) */

export const queueSchema = new Schema<queueType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    queueName: {
        type: String,
        required: true
    },
    queueUrl: {
        type: String,
        required: true
    },
    minElo: {
        type: Number,
        required: true
    },
    maxElo: {
        type: Number,
        required: true
    },
    players: [String]
})


export const lobbySchema = new Schema<lobbyType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lobbyName: {
        type: String,
        required: true
    },
    players: [
        {
            playerId: {
                type: String,
                required: true
            },
            accepted: {
                type: Boolean,
                required: true
            }
        }
    ],
    homeTeam: [String],
    awayTeam: [String],
    completed: {
        type: Boolean,
        required: true
    }
})