'use client'
import PlayerCard from "@/components/players/PlayerCard"
import { teamType, userType } from "@/types"
import { WVList } from "virtua"
import { FaCrown } from "react-icons/fa"









export default function PageView({ team, players }: { team?: teamType, players?: userType[] }) {

    return(
        <div className="p-2">
            <WVList className="flex flex-col">
                {players?.map((player) => {
                    return(
                        <div key={`teamPlayer${player._id.toString()}`} className="mx-auto relative">
                            <PlayerCard player={player} team={team}/>
                            {/* TODO: Taç işareti player cardın içerisine taşınacak */}
                            {player._id.toString() == team?.owner || player._id.toString() == team?.captain || player._id.toString() == team?.coCaptain ? (
                                <div className="flex absolute top-2 left-8 w-8 h-8 items-center justify-center rounded-full bg-blue-800 text-xl border-white border text-white">
                                    <FaCrown/>
                                </div>
                            ): null }
                        </div>
                    )
                })}
                
            </WVList>
        </div>
    )
}