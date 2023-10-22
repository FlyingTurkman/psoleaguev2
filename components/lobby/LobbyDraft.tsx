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
import { useEffect, useState, useRef } from "react"
import { lobbyMessages, sendLobbyMessage } from "@/utils/src/constants"
import { VList } from "virtua"
import { AiFillCrown } from "react-icons/ai"
import { pickPlayer } from "./pickPlayer"
import { useFormik } from "formik"
import { v4 as uudiv4 } from 'uuid'



const socket = new WebSocket(process.env.socketPath)





export default function LobbyDraft({ lobby, initialMessages , players, userId, token }: { lobby: lobbyType | null | undefined, initialMessages: lobbyMessageType[], players: userType[], userId?: string, token?: string }) {
    const formRef = useRef<HTMLFormElement>(null)
    const messageInputRef = useRef<HTMLInputElement>(null)
    const sendMessageWithUserId = sendMessage.bind(null, { userId, lobbyId: lobby?._id.toString()})
    const pickPlayerWithPlayerId = pickPlayer.bind(null, { pickerId: userId, lobbyId: lobby?._id.toString() })
    const [messages, setMessages] = useState<lobbyMessageType[]>(initialMessages)

    useEffect(() => {
        if (socket.readyState != WebSocket.OPEN) {
            socket.addEventListener('open', () => {
                socket.send(JSON.stringify({
                    action: 'userJoined',
                    userId: userId
                }))
            })
            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data)
                if (data) {
                    if (data.lobbyMessage) {
                        const { dateTime, ...others} = JSON.parse(JSON.stringify(data.lobbyMessage))
                        const messageCheck: lobbyMessageType | undefined = messages.find((m) => m._id.toString() == others._id.toString())
                        if (!messageCheck) {
                            setMessages((oldMessages) => [...oldMessages, {...others, dateTime: new Date(dateTime)}])
                        }
                    }
                }
            })
        }
        return () => {
            socket.removeEventListener('open', () => {})
            socket.removeEventListener('message', () => {})
            socket.close()
        }

    }, [])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    useEffect(() => {
        const element = document.getElementById('messagesArea')
        if (element) {
            element.scrollTop = element?.scrollHeight
        }
    }, [messages])


    function messageSended() {
        console.log('message sended')
        if (messageInputRef && messageInputRef.current) {
            socket.send(JSON.stringify({
                action: sendLobbyMessage,
                message: {
                    _id: uudiv4(),
                    lobbyId: lobby?._id.toString(),
                    playerId: userId,
                    dateTime: new Date(),
                    content: messageInputRef.current.value
                }
            }))
        }
    }
    return(
        <Card className="flex flex-col container gap-2 max-h-screen scrollBar overflow-auto">
            <CardHeader className="items-center justify-center">
                <CardTitle>{lobby?.lobbyName}</CardTitle>
                <CardDescription>Waiting for draft</CardDescription>
            </CardHeader>
            <hr/>
            <CardContent className="flex flex-col gap-1">
                <CardDescription>Players waiting for pick</CardDescription>
                <form className="flex flex-row flex-wrap gap-2" action={pickPlayerWithPlayerId}>
                    {lobby?.players.filter((p) => !lobby.homeTeam?.includes(p.playerId) && !lobby.awayTeam?.includes(p.playerId)).map((p) => {
                        const player = players.find((user) => user._id.toString() == p.playerId)
                        if (player) {
                            return(
                                <HoverCard key={`playerPickButton${player._id.toString()}`}>
                                    <HoverCardTrigger>
                                        <Button variant={'green'} name="playerId" value={player._id.toString()} className="flex flex-row h-full justify-between" disabled={lobby.turn != userId? true: false} type="submit">
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
                </form>
            </CardContent>
            <CardContent className="flex flex-row gap-2">
                <div className="flex flex-col basis-1/2 gap-2 items-center border-gray-300 border rounded p-2">
                    <CardTitle>Home Team</CardTitle>
                    <hr className="w-full"/>
                    {lobby?.homeTeam?.map((p, i) => {
                        const player = players.find((user) => user._id.toString() == p)
                        return(
                            <HoverCard key={`playerHomeTeam${player?._id.toString()}`}>
                                <HoverCardTrigger>
                                    <Button variant={'red'} className="flex flex-row h-full justify-between" disabled={lobby.turn != userId? true: false}>
                                        {i == 0? (
                                            <AiFillCrown/>
                                        ): null }
                                        {player?.username?? 'User Not Found'}
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="flex flex-row gap-2 items-center">
                                    <Avatar>
                                        {player?.avatar && (
                                            <AvatarImage src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player?.avatar?? '')}`}></AvatarImage>
                                        )}
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            <IoPerson/>
                                        </AvatarFallback>
                                    </Avatar>
                                    {player?.username}
                                    <div className="flex flex-col gap-1">
                                        <Badge>
                                            {positionLists.find((pos) => pos.id == player?.mainPosition)?.position}
                                        </Badge>
                                        <Badge>
                                            {positionLists.find((pos) => pos.id == player?.sidePosition)?.position}
                                        </Badge>
                                    </div>
                                </HoverCardContent>
                            </HoverCard> 
                        )
                    })}
                </div>
                <div className="flex flex-col basis-1/2 gap-2 items-center border-gray-300 border rounded p-2">
                    <CardTitle>Away Team</CardTitle>
                    <hr className="w-full"></hr>
                    {lobby?.awayTeam?.map((p, i) => {
                        const player = players.find((user) => user._id.toString() == p)
                        return(
                            <HoverCard key={`playerAwayTeam${player?._id.toString()}`}>
                                <HoverCardTrigger>
                                    <Button className="flex flex-row h-full justify-between" disabled={lobby.turn != userId? true: false}>
                                        {i == 0? (
                                            <AiFillCrown/>
                                        ): null }
                                        {player?.username?? 'User Not Found'}
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="flex flex-row gap-2 items-center">
                                    <Avatar>
                                        {player?.avatar && (
                                            <AvatarImage src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player?.avatar?? '')}`}></AvatarImage>
                                        )}
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            <IoPerson/>
                                        </AvatarFallback>
                                    </Avatar>
                                    {player?.username}
                                    <div className="flex flex-col gap-1">
                                        <Badge>
                                            {positionLists.find((pos) => pos.id == player?.mainPosition)?.position}
                                        </Badge>
                                        <Badge>
                                            {positionLists.find((pos) => pos.id == player?.sidePosition)?.position}
                                        </Badge>
                                    </div>
                                </HoverCardContent>
                            </HoverCard> 
                        )
                    })}
                </div>
            </CardContent>
            <hr/>
            <CardContent>
                <form ref={formRef} className="flex flex-col gap-2" action={sendMessageWithUserId} onSubmitCapture={() => messageSended()} autoComplete="off">
                    <CardDescription>Lobby Chat</CardDescription>
                    <VList id="messagesArea" className="flex flex-col gap-2 p-2 h-60 max-h-60 overflow-auto scrollBar border border-gray-300 rounded" style={{height: '240px'}}>
                        {messages.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()).map((message) => {
                            const player = players.find((p) => p._id.toString() == message.playerId)
                            return(
                                <div key={`lobbyMessage${message._id.toString()}`} className="flex flex-row items-start gap-1">
                                    <div className="flex flex-col">
                                        <label className={`font-semibold ${lobby?.homeTeam?.includes(message.playerId)? 'text-red-600': lobby?.awayTeam?.includes(message.playerId)? 'text-blue-600': 'text-black'} transition-all`}>{player?.username}: </label>
                                        <CardDescription>{new Date(message.dateTime).toLocaleTimeString()}</CardDescription>
                                    </div>
                                    <p>{message.content}</p>
                                </div>
                            )
                        })}
                    </VList>
                    <hr/>
                    <div className="flex flex-row gap-2">
                        <Input type="text" ref={messageInputRef} placeholder="Message" id="message" name="message" required/>
                        <Button type="submit" size={'icon'}>
                            <IoSend/>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
