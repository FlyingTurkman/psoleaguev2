import { matchType, teamType, userType, wallType, queueType, lobbyType, lobbyMessageType } from "@/types";
import mongoose from "mongoose";
import { lobbyMessageSchema, lobbySchema, matchSchema, queueSchema, teamSchema, userSchema, wallSchema } from "./schemas";






mongoose.connect(process.env.mongoUri, { dbName: process.env.dbName })





export const Users = mongoose.models.users || mongoose.model<userType>('users', userSchema)

export const Teams = mongoose.models.teams || mongoose.model<teamType>('teams', teamSchema)

export const Walls = mongoose.models.walls || mongoose.model<wallType>('walls', wallSchema)

export const Matches = mongoose.models.matches || mongoose.model<matchType>('matches', matchSchema)

export const Queues = mongoose.models.queues || mongoose.model<queueType>('queues', queueSchema)

export const Lobbies = mongoose.models.lobbies || mongoose.model<lobbyType>('lobbies', lobbySchema)

export const LobbyMessages = mongoose.models.lobbymessages || mongoose.model<lobbyMessageType>('lobbymessages', lobbyMessageSchema)