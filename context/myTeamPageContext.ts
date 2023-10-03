import { myTeamPageContextType } from "@/types";
import { createContext } from "react";






export const MyTeamPageContext = createContext<myTeamPageContextType>({
    team: null,
    setTeam: () => {}
})