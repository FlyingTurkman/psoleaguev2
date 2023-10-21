'use client'
import { useContext, useEffect, useState } from 'react'
import { SiteContext } from '@/context/SiteContext'
import { lobbyMessageType, lobbyType, siteContextType, userType } from '@/types'
import { HiUserGroup } from 'react-icons/hi'
import Button from '../Button'
import { lobbiesUpdates, lobbyUpdate, lobbyWaitingForAccept, lobbyWaitingForDraft, lobbyWaitingForResult } from '@/utils/src/constants'
import LobbyJoin from './LobbyJoin'
import LobbyDraft from './LobbyDraft'
import LobbyInfo from './LobbyInfo'



const socket = new WebSocket(process.env.socketPath)


export default function LobbyView({ initialLobby, initialMessages, token, players }: { initialLobby: lobbyType | null | undefined, initialMessages: lobbyMessageType[], token?: string, players: userType[] }) {
    const { user }: siteContextType = useContext(SiteContext)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [lobby, setLobby] = useState<lobbyType | null | undefined>(initialLobby)
    const [messages, setMessages] = useState<lobbyMessageType[]>(initialMessages || [])
    useEffect(() => {
        console.log('use effect works 1')
        if (socket.readyState != WebSocket.OPEN) {
            console.log('socket works')
            socket.addEventListener('open', () => {
                console.log('open works')
                socket.send(JSON.stringify({
                    action: 'userJoined',
                    userId: user?._id.toString()
                }))
            })
            socket.addEventListener('message', (event) => {
                console.log('message works')
                if (event.data) {
                    const data = JSON.parse(event.data)
                    if (data.lobby) {
                        console.log('data', data.lobby)
                        if (data.lobby._id.toString() == initialLobby?._id.toString()) {
                            const newLobby: lobbyType = {
                                _id: data.lobby._id.toString(),
                                lobbyName: data.lobby.lobbyName,
                                players: data.lobby.players,
                                acceptDeadline: data.acceptDeadline,
                                completed: data.completed,
                                lobbyResult: data.lobbyResult,
                                turn: data.turn,
                                awayTeam: data.awayTeam,
                                homeTeam: data.homeTeam,
                                lobbyPassword: data.lobbyPassword
                            }
                            console.log('newlobby', data.lobby)
                            setLobby(data.lobby)
                        }
                    }
                } else {
                    console.log('event data not working')
                }
            })
        }
        console.log('use effect works 2')
        return () => {
            socket.close()
        }
    }, [])
    return(
        <div className={`${lobby && !lobby.completed? 'block' : 'hidden'}`}>
            {isOpen? (
                <div className='flex flex-col absolute top-0 left-0 w-full h-full items-center justify-center backdrop-blur-sm bg-opacity-30 bg-black z-[101]'>
                    <div className='flex flex-col rounded container w-full'>
                        {lobby?.lobbyResult == lobbyWaitingForAccept && (
                            <LobbyJoin lobby={lobby} userId={user?._id.toString()} token={token}/>
                        )}
                        {lobby?.lobbyResult == lobbyWaitingForDraft && (
                            <LobbyDraft lobby={lobby} initialMessages={messages} players={players} userId={user?._id.toString()} token={token}/>
                        )}
                        {lobby?.lobbyResult == lobbyWaitingForResult && (
                            <LobbyInfo lobby={lobby} players={players}/>
                        )}
                    </div>
                </div>
            ): null}
            
            <div className='fixed bottom-0 right-10 bg-blue-600 text-white p-2 rounded-t z-[100]'>
                <Button className='buttonPrimary text-2xl' onClick={() => setIsOpen(true)}>
                    <HiUserGroup/>
                </Button>
            </div>
        </div>
    )
}