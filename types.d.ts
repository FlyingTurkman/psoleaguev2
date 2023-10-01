import { ObjectId } from "mongodb"

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