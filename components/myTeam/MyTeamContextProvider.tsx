'use client'
import { MyTeamPageContext } from "@/context/myTeamPageContext"
import { myTeamPageContextType, teamType } from "@/types"
import React from "react"
import { useState } from "react"





export default function MyTeamContextProvider({ children, initialTeam }: { children?: React.ReactNode, initialTeam: teamType | null | undefined }) {
    const [team, setTeam] = useState<teamType | null | undefined>(initialTeam)
    const pageData: myTeamPageContextType = {
        team,
        setTeam
    }
    return(
        <MyTeamPageContext.Provider value={pageData}>
            {children}
        </MyTeamPageContext.Provider>
    )
}