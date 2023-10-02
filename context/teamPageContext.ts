import { teamPageContextType } from "@/types";
import { createContext } from "react";




export const TeamPageContext = createContext<teamPageContextType>({
    teams: [],
    setTeams: () => {}
})