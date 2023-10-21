'use server'
import { ObjectId } from 'mongodb'
import { LobbyMessages } from "@/utils/mongodb/models"
import {  sendLobbyMessage } from '@/utils/src/constants'




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

        /* const socket = new WebSocket(process.env.socketPath)

        if (socket.readyState != WebSocket.OPEN) {
            console.log('socket on')

            socket.send(JSON.stringify({
                action: sendLobbyMessage,
                message: 'test message',
            }))
            

        } else {
            console.log('socket off')
        } */

    } catch (error) {
        console.log(error)
        return false
    }
}