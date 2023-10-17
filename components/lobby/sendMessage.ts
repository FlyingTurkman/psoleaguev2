'use server'
import { ObjectId } from 'mongodb'
import { lobbyMessageType, lobbyType } from "@/types"
import { Lobbies, LobbyMessages } from "@/utils/mongodb/models"
import { revalidatePath } from 'next/cache'
import { io } from 'socket.io-client'
import { lobbyMessages } from '@/utils/src/constants'


const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)

export async function sendMessage( { userId, lobbyId }: {userId?: string, lobbyId?: string }, formData: FormData) {
    try {
        const content = formData.get('message')

        const newMessage = {
            _id: new ObjectId(),
            lobbyId,
            playerId: userId,
            dateTime: new Date(),
            content
        }
        await LobbyMessages.create(newMessage)
        socket.emit(lobbyMessages, newMessage)
    } catch (error) {
        console.log(error)
        return false
    }
}