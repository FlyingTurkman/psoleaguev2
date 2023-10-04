'use client'
import { teamPageContextType, teamType, userType } from "@/types";
import { TeamPageContext } from "@/context/teamPageContext";
import { useState } from "react";
import SearchBar from "@/components/teams/SearchBar";
import { WVList } from "virtua";
import TeamCard from "@/components/teams/TeamCard";




export default function PageView({ initialTeams, initialUsers }: { initialTeams: teamType[], initialUsers: userType[] }) {
    const [teams, setTeams] = useState<teamType[]>(initialTeams)
    const [users, setUsers] = useState<userType[]>(initialUsers)
    const pageData: teamPageContextType = {
        teams,
        setTeams
    }
    return(
        <TeamPageContext.Provider value={pageData}>
            <div className="flex flex-col w-full items-center">
                <SearchBar/>
                <WVList className="flex flex-col mx-auto items-center gap-2">
                        {teams.map((team) => {
                            return(
                                <TeamCard 
                                key={`teamCard${team._id.toString()}`} 
                                team={team}
                                owner={users.find((user) => user._id.toString() == team.owner)}
                                captain={users.find((user) => user._id.toString() == team.captain)}
                                coCaptain={users.find((user) => user._id.toString() == team.coCaptain)}
                                />
                            )
                        })}
                </WVList>
            </div>
        </TeamPageContext.Provider>
    )
}