'use client'
import { teamPageContextType, teamType } from "@/types";
import { TeamPageContext } from "@/context/teamPageContext";
import { useState } from "react";




export default function PageView({ initialTeams }: { initialTeams: teamType[] }) {
    const [teams, setTeams] = useState<teamType[]>(initialTeams)
    const pageData: teamPageContextType = {
        teams,
        setTeams
    }
    return(
        <TeamPageContext.Provider value={pageData}>
            <div>
                
            </div>
        </TeamPageContext.Provider>
    )
}