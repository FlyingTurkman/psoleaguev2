'use client'
import MatchCard from "@/components/matches/MatchCard"
import { matchType, teamType, userType } from "@/types"
import { useState } from "react"
import { WVList } from "virtua"










export default function PageView({ initialMatches, initialTeams, initialPlayers }: { initialMatches?: matchType[], initialTeams?: teamType[], initialPlayers?: userType[] }) {
    const [matches, setMatches] = useState<matchType[]>(initialMatches || [])
    const [teams, setTeams] = useState<teamType[]>(initialTeams || [])
    const [players, setPlayers] = useState<userType[]>(initialPlayers || [])
    return(
        <div className="my-2">
            <WVList className="flex flex-col gap-2">
                {matches.map((match) => {
                    const homeTeam: teamType | undefined = teams.find((team) => team._id.toString() == match.home?.teamId)
                    const awayTeam: teamType | undefined = teams.find((team) => team._id.toString() == match.away?.teamId)
                    let homePlayers: userType[] = []
                    let awayPlayers: userType[] = []
                    for (const player of match.home?.players || []) {
                        const homePlayer: userType | undefined = players.find((p) => {
                            if (p._id.toString() == player) {
                                return p
                            }
                        })
                        if (homePlayer) homePlayers.push(homePlayer)
                    }
                    for (const player of match.away?.players || []) {
                        const awayPlayer: userType | undefined = players.find((p) => {
                            if (p._id.toString() == player) {
                                return p
                            }
                        })
                        if (awayPlayer) awayPlayers.push(awayPlayer)
                    }
                    return(
                        <MatchCard 
                        key={`previousMatch${match._id.toString()}`}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        homePlayers={homePlayers}
                        awayPlayers={awayPlayers}/>
                    )
                })}
                <MatchCard/>
            </WVList>
        </div>
    )
}