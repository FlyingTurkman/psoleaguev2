import { userType } from "@/types";
import mongoose from "mongoose";
import { userSchema } from "./schemas";






mongoose.connect(process.env.mongoUri, { dbName: process.env.dbName })





export const Users = mongoose.models.users || mongoose.model<userType>('users', userSchema)