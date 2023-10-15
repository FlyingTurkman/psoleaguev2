import { lobbyType } from "@/types";
import LobbyView from "./LobbyView";


















export default function Lobby({ initialLobby, token }: { initialLobby: lobbyType | null | undefined, token?: string }) {
    return(
        <div>
            <LobbyView initialLobby={initialLobby} token={token}/>
        </div>
    )
} 