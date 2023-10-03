'use client'
import { teamPageContextType, teamType } from "@/types";
import { TeamPageContext } from "@/context/teamPageContext";
import { useState } from "react";
import SearchBar from "@/components/teams/SearchBar";
import { WVList } from "virtua";




export default function PageView({ initialTeams }: { initialTeams: teamType[] }) {
    const [teams, setTeams] = useState<teamType[]>(initialTeams)
    const pageData: teamPageContextType = {
        teams,
        setTeams
    }
    return(
        <TeamPageContext.Provider value={pageData}>
            <div className="flex flex-col w-full items-center">
                <SearchBar/>
                <WVList>
                    <div className="flex flex-col mx-auto items-center gap-2">
                        {teams.map((team) => {
                            return(
                                <div key={`${team._id.toString()}`}>

                                </div>
                            )
                        })}
                    </div>
                </WVList>
            </div>
        </TeamPageContext.Provider>
    )
}