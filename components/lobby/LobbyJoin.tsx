'use client'
import { IoCheckmark, IoClose, IoRemoveCircleOutline } from "react-icons/io5"
import Button from "../Button"
import { lobbyType } from "@/types"
import { AiOutlineLoading3Quarters } from "react-icons/ai"









export default function LobbyJoin({ lobby, userId, token }: { lobby: lobbyType | null | undefined, userId?: string, token?: string }) {
    let accepted = false
    if (lobby?.players) {
        for (const player of lobby?.players) {
            if (player.playerId == userId) {
                accepted = player.accepted
            }
        }
    }

    return(
        <div className="flex flex-col gap-2 p-2 rounded-xl">
            <label className="formLabel">Waiting for players</label>
            <div className="flex flex-row gap-1">
                {lobby?.players.map((player, index) => {
                    return(
                        <div key={`lobbyPlayerJoinCheck${player.playerId}-${index}`} className={`flex ${player.accepted ? 'bg-blue-600' : 'bg-red-600'} p-2 rounded-full flex-shrink-0 text-xl text-white transition-all`}>
                            {player.accepted ? (
                                <IoCheckmark/>
                            ): (
                                <IoClose/>
                            )}
                            
                        </div>
                    )
                })}
                
            </div>
            <hr/>
            {accepted? (
                <div className="flex flex-col items-center">
                    <div className="flex w-10 h-10 aspect-square flex-shrink-0 animate-spin items-center justify-center text-xl">
                        <AiOutlineLoading3Quarters/>
                    </div>
                    
                    <label className="formLabel">Waiting for other players</label>
                </div>
            ): (
            <div className="flex flex-row gap-2 items-center justify-between p-2">
                <Button className="buttonPrimary">Accept</Button>
                <Button className="buttonRed">Decline</Button>
            </div>
            )}

        </div>
    )
}