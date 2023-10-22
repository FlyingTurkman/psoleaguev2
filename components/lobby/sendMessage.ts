'use server'
import { ObjectId } from 'mongodb'
import { LobbyMessages } from "@/utils/mongodb/models"
import {  sendLobbyMessage } from '@/utils/src/constants'
import { socket } from '../../utils/src/webSocket'



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

        

        /* if (socket.readyState != WebSocket.OPEN) {
            console.log('socket on')
            socket.addEventListener('open', () => {
                socket.send(JSON.stringify({
                    action: 'userJoined',
                    userId: userId,
                }))
            })
            console.log('ready state', socket.readyState)
            socket.send(JSON.stringify({
                action: sendLobbyMessage,
                message: JSON.parse(JSON.stringify(newMessage))
            }))   
        } else {
            console.log('socket off')
        } */

    } catch (error) {
        console.log(error)
        return false
    }
}