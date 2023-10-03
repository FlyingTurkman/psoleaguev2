'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { siteContextType, teamType, userType } from "@/types"







export default function SiteContextProvider({ children, user, team }: { children: React.ReactNode, user: userType | null | undefined, team: teamType | null | undefined }) {
    const siteData: siteContextType = {
        user,
        team
    }
    return(
        <SiteContext.Provider value={siteData}>
            {children}
        </SiteContext.Provider>
    )
}