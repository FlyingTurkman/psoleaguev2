import { playerPageContextType } from "@/types";
import { createContext } from "react";



export const PlayerPageContext  = createContext<playerPageContextType>({
    players: [],
    setPlayers: () => {},
    teams: [],
    setTeams: () => {}
})