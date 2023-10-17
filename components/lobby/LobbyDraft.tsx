'use client'
import { lobbyMessageType, lobbyType, userType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { userAvatar } from "@/utils/src/userImages"
import { IoPerson, IoSend } from "react-icons/io5"
import { Badge } from "../ui/badge"
import { positionLists } from "@/utils/src/positionLists"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { sendMessage } from "./sendMessage"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { lobbyMessages } from "@/utils/src/constants"





const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)



export default function LobbyDraft({ lobby, initialMessages , players, userId, token }: { lobby: lobbyType | null | undefined, initialMessages: lobbyMessageType[], players: userType[], userId?: string, token?: string }) {
    const sendMessageWithUserId = sendMessage.bind(null, { userId, lobbyId: lobby?._id.toString()})
    const [messages, setMessages] = useState<lobbyMessageType[]>(initialMessages)
    useEffect(() => {
        socket.on(lobbyMessages, (newMessage: lobbyMessageType) => {
            if (newMessage.lobbyId == lobby?._id.toString()) {
                const messageCheck: lobbyMessageType | undefined = messages.find((m) => m._id.toString() == newMessage._id.toString())
                if (!messageCheck) {
                    setMessages((oldMessages) => [...oldMessages, newMessage])
                }
            }
        })

        return () => {
            socket.off(lobbyMessages)
        }
    }, [])
    useEffect(() => {
        const element = document.getElementById('messagesArea')
        if (element) {
            element.scrollTop = element?.scrollHeight
        }
    }, [messages])
    return(
        <Card className="flex flex-col container gap-2 max-h-screen scrollBar overflow-auto">
            <CardHeader className="items-center justify-center">
                <CardTitle>{lobby?.lobbyName}</CardTitle>
                <CardDescription>Waiting for draft</CardDescription>
            </CardHeader>
            <hr/>
            <CardContent className="flex flex-col gap-1">
                <CardDescription>Players waiting for pick</CardDescription>
                <div className="flex flex-row flex-wrap gap-2">
                    {lobby?.players.map((p) => {
                        const player = players.find((user) => user._id.toString() == p.playerId)
                        if (player) {
                            return(
                                <HoverCard key={`playerPickButton${player._id.toString()}`}>
                                    <HoverCardTrigger>
                                        <Button  className="flex flex-row h-full justify-between">
                                            {player.username}
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="flex flex-row gap-2 items-center">
                                        <Avatar>
                                            {player.avatar && (
                                                <AvatarImage src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player?.avatar?? '')}`}></AvatarImage>
                                            )}
                                            <AvatarFallback className="bg-blue-600 text-white">
                                                <IoPerson/>
                                            </AvatarFallback>
                                        </Avatar>
                                        {player.username}
                                        <div className="flex flex-col gap-1">
                                            <Badge>
                                                {positionLists.find((pos) => pos.id == player.mainPosition)?.position}
                                            </Badge>
                                            <Badge>
                                                {positionLists.find((pos) => pos.id == player.sidePosition)?.position}
                                            </Badge>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>  
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </CardContent>
            <CardContent className="flex flex-row gap-2">
                <div className="flex flex-col basis-1/2 gap-2 items-center border-gray-300 border rounded p-2">
                    <CardTitle>Home Team</CardTitle>
                    <hr className="w-full"/>
                </div>
                <div className="flex flex-col basis-1/2 gap-2 items-center border-gray-300 border rounded p-2">
                    <CardTitle>Away Team</CardTitle>
                    <hr className="w-full"></hr>
                </div>
            </CardContent>
            <hr/>
            <CardContent>
                <form className="flex flex-col gap-2" action={sendMessageWithUserId} autoComplete="off">
                    <CardDescription>Lobby Chat</CardDescription>
                    <div id="messagesArea" className="flex flex-col gap-2 p-2 h-60 max-h-60 overflow-auto scrollBar border border-gray-300 rounded">
                        {messages.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()).map((message) => {
                            const player = players.find((p) => p._id.toString() == message.playerId)
                            return(
                                <div key={`lobbyMessage${message._id.toString()}`} className="flex flex-row items-start gap-1">
                                    <div className="flex flex-col">
                                        <label className={`font-semibold`}>{player?.username}: </label>
                                        <CardDescription>{new Date(message.dateTime).toLocaleTimeString()}</CardDescription>
                                    </div>
                                    <p>{message.content}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                    <hr/>
                    <div className="flex flex-row gap-2">
                        <Input type="text" placeholder="Message" name="message"/>
                        <Button type="submit" size={'icon'}>
                            <IoSend/>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
