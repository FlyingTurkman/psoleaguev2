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
    dateTime: Date
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

export type siteContextType = {
    user?: userType | null | undefined,
    team?: teamType | null | undefined
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
            measurementId: string
        }
    }
}