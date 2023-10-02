'use client'
import SearchBar from "@/components/players/SearchBar";
import { useState } from 'react'
import { PlayerPageContext } from "@/context/playerPageContext";
import { playerPageContextType, teamType, userType } from "@/types";
import { WVList } from "virtua";
import PlayerCard from "@/components/players/PlayerCard";







export default function PageView({ initialPlayers, initialTeams }: { initialPlayers: userType[], initialTeams: teamType[] }) {
    const [players, setPlayers] = useState<userType[]>(initialPlayers)
    const [teams, setTeams] = useState<teamType[]>(initialTeams)
    const pageData: playerPageContextType = {
        players,
        setPlayers,
        teams,
        setTeams
    }
    return(
        <PlayerPageContext.Provider value={pageData}>
            <div className="flex flex-col w-full items-center">
                <SearchBar/>
                <WVList>
                    <div className="flex flex-col mx-auto items-center gap-2">
                        {players.map((player, index) => {
                            const team: teamType | null | undefined = teams.find((t) => t._id.toString() == player.teamId)
                            return(
                                <PlayerCard key={`playerList${index}-${player._id.toString()}`}/>
                            )
                        })}
                    </div>
                </WVList>
            </div>
        </PlayerPageContext.Provider>
    )
}