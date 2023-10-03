import { ObjectId } from "mongodb"
import { Dispatch } from 'react'


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
    owner: string,
    captain: string,
    coCaptain?: string,
    country: string,
    avatar?: string,
    dateTime: Date
}

export type siteContextType = {
    user?: userType | null | undefined
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