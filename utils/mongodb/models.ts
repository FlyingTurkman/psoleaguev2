import { teamType, userType, wallType } from "@/types";
import mongoose from "mongoose";
import { teamSchema, userSchema, wallSchema } from "./schemas";






mongoose.connect(process.env.mongoUri, { dbName: process.env.dbName })





export const Users = mongoose.models.users || mongoose.model<userType>('users', userSchema)

export const Teams = mongoose.models.teams || mongoose.model<teamType>('teams', teamSchema)

export const Walls = mongoose.models.walls || mongoose.model<wallType>('walls', wallSchema)