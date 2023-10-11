'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { queueType, siteContextType, teamType, userType } from "@/types"
import { useEffect } from 'react'






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
        }, 20000)
        return () => {
            clearInterval(queueInterval)
            clearInterval(onlineInterval)
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
            await fetch(`${process.env.appPath}/api/userApi/lastOnlineUpdateApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQueuePlayers() {
        try {
            await fetch(`${process.env.appPath}/api/queueApi/updateQueuePlayersApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    queueId: queue?._id.toString()
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}