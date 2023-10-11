'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { queueType, siteContextType, teamType, userType } from "@/types"
import { useEffect } from 'react'






export default function SiteContextProvider({ children, user, team, queue, token }: { children: React.ReactNode, user: userType | null | undefined, team: teamType | null | undefined, queue: queueType | null | undefined, token?: string }) {
    useEffect(() => {
        const queueInterval = setInterval(() => {
            if (queue) {
                console.log('last login updated')
            }
        }, 5000)
        return () => {
            clearInterval(queueInterval)
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
}