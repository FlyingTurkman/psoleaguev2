'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { queueType, siteContextType, teamType, userType } from "@/types"
import { useEffect } from 'react'
import { clearInterval, setInterval } from 'worker-timers';





export default function SiteContextProvider({ children, user, team, queue, token }: { children: React.ReactNode, user: userType | null | undefined, team: teamType | null | undefined, queue: queueType | null | undefined, token?: string }) {
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

        
        return () => {
            clearInterval(queueInterval)
            clearInterval(onlineInterval)
            
        }
    }, [])
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
}