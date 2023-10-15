'use client'
import { useContext, useEffect, useState } from 'react'
import { SiteContext } from '@/context/SiteContext'
import { lobbyType, siteContextType } from '@/types'
import { HiUserGroup } from 'react-icons/hi'
import Button from '../Button'
import { io } from 'socket.io-client'
import { lobbiesUpdates, lobbyUpdate } from '@/utils/src/constants'
import LobbyJoin from './LobbyJoin'
import { IoRemoveCircleOutline } from 'react-icons/io5'




const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)



export default function LobbyView({ initialLobby, token }: { initialLobby: lobbyType | null | undefined, token?: string }) {
    const { user }: siteContextType = useContext(SiteContext)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [lobby, setLobby] = useState<lobbyType | null | undefined>(initialLobby)
    useEffect(() => {
        socket.on(lobbyUpdate, (currentLobby: lobbyType | null | undefined) => {
            if (!lobby || !currentLobby) setLobby(null)
            if (!currentLobby?.players) return
            for (const player of  currentLobby.players) {
                if (player.playerId == user?._id.toString()) {
                    setLobby(currentLobby)
                }
            }
        })

        socket.on(lobbiesUpdates, (currentLobbies: lobbyType[]) => {
            let isUserInALobby = false
            for (const l of currentLobbies) {
                for (const player of l.players) {
                    if (player.playerId == user?._id.toString()) {
                        isUserInALobby = true
                    }
                }
            }
            if (!isUserInALobby) {
                setLobby(null)
            }
        })

        return () => {
            socket.off(lobbyUpdate)
        }
    }, [])
    return(
        <div className={`${lobby && !lobby.completed? 'block' : 'hidden'}`}>
            {isOpen? (
                <div className='flex flex-col absolute top-0 left-0 w-full h-full items-center justify-center backdrop-blur-sm bg-opacity-30 bg-black z-[101]'>
                    <div className='flex flex-col bg-white rounded'>
                        <div className="flex flex-row items-center justify-between p-2 gap-2">
                            <h1 className="ml-12">{lobby?.lobbyName}</h1>
                            <Button className="flex flex-shrink-0 p-2 !w-10 !h-10 items-center justify-center text-2xl" onClick={() => setIsOpen(false)}>
                                <IoRemoveCircleOutline/>
                            </Button>
                        </div>
                        <hr/>
                        <LobbyJoin lobby={lobby} userId={user?._id.toString()} token={token}/>
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