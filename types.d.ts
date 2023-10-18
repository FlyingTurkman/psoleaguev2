import { ObjectId } from "mongodb"
import { Dispatch } from 'react'
import { matchAwayWin, matchCanceled, matchDraw, matchHomeWin, matchNotPlayed, matchPlaying, matchResultWaiting } from "./utils/src/constants"


export {}



export type userType = {
    _id: ObjectId,
    email: string,
    username: string,
    password: string,
    country: string,
    token: string,
    avatar?: string,
    mainPosition?: number,
    sidePosition?: number,
    teamId?: string,
    dateTime: Date,
    elo: number,
    lastOnline: Date
}


export type teamType = {
    _id: ObjectId,
    teamName: string,
    teamTag: string,
    teamUrl: string,
    owner: string,
    captain: string,
    coCaptain?: string,
    country: string,
    avatar?: string,
    dateTime: Date
}

export type wallType = {
    _id: ObjectId,
    from: string,
    to: string,
    content: string,
    dateTime: Date
}

export type matchType = {
    _id: ObjectId,
    leagueId: string,
    home?: {
        teamId?: string,
        players?: string[],
        score?: number,
        captain?: string
    },
    away?: {
        teamId?: string,
        players?: string[],
        score?: number,
        captain?: string
    },
    result: typeof matchNotPlayed | typeof matchPlaying | typeof matchResultWaiting | typeof matchHomeWin | typeof matchDraw | typeof matchAwayWin | typeof matchCanceled,
    dateTime: Date
}

export type lobbyType = {
    _id: ObjectId,
    lobbyName: string,
    lobbyPassword?: string,
    players: lobbyPlayerType[],
    homeTeam?: string[],
    awayTeam?: string[],
    completed: boolean,
    lobbyResult: number,
    acceptDeadline: Date,
    turn: string
}


type lobbyPlayerType = {
    playerId: string,
    accepted: boolean
}

export type lobbyMessageType = {
    _id: ObjectId,
    lobbyId: string,
    playerId: string,
    dateTime: Date,
    content: string
}


/* export type queueType = {
    _id: ObjectId,
    queueName: string,
    queueUrl: string,
    minElo: number,
    maxElo: number,
    players?: queuePlayerType[]
} */


export type queueType = {
    _id: ObjectId,
    queueName: string,
    queueUrl: string,
    minElo: number,
    maxElo: number,
    players?: string[]
}

type queuePlayerType = {
    _id: Object,
    playerId: string,
    username: string,
    mainPosition: number,
    sidePosition: number,
    elo: number,
    lastPing: Date
}

export type siteContextType = {
    user?: userType | null | undefined,
    team?: teamType | null | undefined,
    queue?: queueType |null | undefined
}


export type playerPageContextType = {
    players: userType[],
    setPlayers: Dispatch<userType[]>,
    teams: teamType[],
    setTeams: Dispatch<teamType[]>
}

export type teamPageContextType = {
    teams: teamType[],
    setTeams: Dispatch<teamType[]>
}

export type myTeamPageContextType = {
    team: teamType | null | undefined,
    setTeam: Dispatch<teamType | null | undefined>
}


declare module "bson" {
    interface ObjectId {
      _id: this;
    }
  }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            apiSecret: string,
            mongoUri: string,
            dbName: string,
            appPath: string,
            storagePath: string,
            apiKey: string,
            authDomain: string,
            projectId: string,
            storageBucket: string,
            messagingSenderId: string,
            appId: string,
            measurementId: string,
            socketPath: string,
            socketPort: string
        }
    }
}