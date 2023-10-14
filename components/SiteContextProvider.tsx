'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { queueType, siteContextType, teamType, userType } from "@/types"
import { useEffect, useState } from 'react'
import { clearInterval, setInterval } from 'worker-timers';
import { io } from 'socket.io-client'
import { queueUpdate, queuesUpdate } from "@/utils/src/constants"

const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)


export default function SiteContextProvider({ children, user, team, initialQueue, token }: { children: React.ReactNode, user: userType | null | undefined, team: teamType | null | undefined, initialQueue: queueType | null | undefined, token?: string }) {
    const [queue, setQueue] = useState<queueType | null | undefined>(initialQueue)
    useEffect(() => {
        socket.on(queueUpdate, (currentQueue: queueType | null | undefined) => {
            console.log(currentQueue)
            if (currentQueue?.players?.includes(user?._id.toString()?? 'sharkman')) {
                setQueue(currentQueue)
            }
        })

        socket.on(queuesUpdate, (queues: queueType[]) => {
            let inQueue = false
            for (const tempQueue of queues) {
                if (tempQueue.players?.includes(user?._id.toString()?? 'sharkman')) {
                    inQueue = true
                }
            }
            if (!inQueue){
                setQueue(null)
            }
        })
        return () => {
            socket.off(queueUpdate)
            socket.off(queuesUpdate)
        }
    }, [])
    useEffect(() => {
        const queueInterval = setInterval(() => {
            if (queue) {
                updateLastOnline()
            }
        }, 10000)

        const onlineInterval = setInterval(() => {
            if (queue) {
                updateQueuePlayers()
            }
        }, 30000)

        const matchMakerInterval = setInterval(() => {
            if (queue && queue.players && queue.players[0] == user?._id.toString()) {
                checkMatchMaker()
            }
        }, 60000)
        return () => {
            clearInterval(queueInterval)
            clearInterval(onlineInterval)
            clearInterval(matchMakerInterval)
        }
    }, [queue])
    const siteData: siteContextType = {
        user,
        team,
        queue
    }
    return(
        <SiteContext.Provider value={siteData}>
            {children}
        </SiteContext.Provider>
    )

    async function updateLastOnline() {
        try {
            console.log('update last online', new Date().toLocaleString('tr-TR'))
            await fetch(`${process.env.appPath}/api/userApi/lastOnlineUpdateApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token
                }),
                cache: 'no-cache'
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQueuePlayers() {
        try {
            console.log('update players', new Date().toLocaleString('tr-TR'))
            await fetch(`${process.env.appPath}/api/queueApi/updateQueuePlayersApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    queueId: queue?._id.toString()
                }),
                cache: 'no-cache'
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function checkMatchMaker() {
        
    }
}