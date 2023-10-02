'use client'
import SearchBar from "@/components/players/SearchBar";
import { useState } from 'react'
import { PlayerPageContext } from "@/context/playerPageContext";
import { playerPageContextType, userType } from "@/types";







export default function PageView({ initialPlayers }: { initialPlayers: userType[] }) {
    const [players, setPlayers] = useState<userType[]>(initialPlayers)
    const pageData: playerPageContextType = {
        players,
        setPlayers
    }
    return(
        <PlayerPageContext.Provider value={pageData}>
            <div className="flex flex-col w-full items-center">
                <SearchBar/>
            </div>
        </PlayerPageContext.Provider>
    )
}