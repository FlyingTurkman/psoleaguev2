'use client'
import React from "react"
import { SiteContext } from "@/context/SiteContext"
import { siteContextType, userType } from "@/types"







export default function SiteContextProvider({ children, user }: { children: React.ReactNode, user: userType | null | undefined }) {
    const siteData: siteContextType = {
        user
    }
    return(
        <SiteContext.Provider value={siteData}>
            {children}
        </SiteContext.Provider>
    )
}