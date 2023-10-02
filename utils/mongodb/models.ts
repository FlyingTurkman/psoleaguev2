import { teamType, userType } from "@/types";
import mongoose from "mongoose";
import { teamSchema, userSchema } from "./schemas";






mongoose.connect(process.env.mongoUri, { dbName: process.env.dbName })





export const Users = mongoose.models.users || mongoose.model<userType>('users', userSchema)

export const Teams = mongoose.models.teams || mongoose.model<teamType>('teams', teamSchema)