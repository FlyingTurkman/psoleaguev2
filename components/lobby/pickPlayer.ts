'use server'

import { lobbyType } from "@/types"
import { Lobbies } from "@/utils/mongodb/models"
import { lobbyWaitingForResult } from "@/utils/src/constants"





type functionProps = {
    status: boolean,
    message: string
}



export async function pickPlayer( { pickerId, lobbyId }: { pickerId?: string, lobbyId?: string }, formData: FormData): Promise<functionProps> {
    try {
        if (!lobbyId) {
            return { status: false, message: 'Lobby not found' }
        }

        const lobby: lobbyType | null | undefined = await Lobbies.findOne({ _id: lobbyId })

        if (!lobby) {
            return { status: false, message: 'Lobby not found' }
        }

        if (!lobby.homeTeam || !lobby.awayTeam) {
            return { status: false, message: 'Team captains not found' }
        }

        if (lobby.turn != pickerId) {
            return { status: false, message: 'Not your turn' }
        }

        const playerId = formData.get('playerId')

        if (!playerId) {
            return { status: false, message: 'Player not found' }
        }

        let result: functionProps = {
            status: false,
            message: 'An error has occured'
        }

        if (lobby.homeTeam?.includes(pickerId)) {
            result = await homePicks(lobbyId, pickerId, playerId.toString())
            if (lobby.homeTeam?.length == lobby.awayTeam?.length) {
                await Lobbies.updateOne({
                    _id: lobbyId
                }, {
                    $set: {
                        turn: lobby.awayTeam[0]
                    }
                })
            }
        } else {
            if (lobby.homeTeam?.length == lobby.awayTeam?.length) {
                await Lobbies.updateOne({
                    _id: lobbyId
                }, {
                    $set: {
                        turn: lobby.homeTeam[0]
                    }
                })
            }
            result = await awayPicks(lobbyId, pickerId, playerId.toString())
        }

        if (lobby.players.length - (lobby.homeTeam.length + lobby.awayTeam.length) == 1) {
            let lobbyName = lobby.lobbyName
            const lobbyNumber = Math.floor(Math.random() * 9000) + 1000
            lobbyName = `${lobbyName} #${lobbyNumber}`
            const lobbyPassword = Math.floor(Math.random() * 100000).toString()
            await Lobbies.updateOne({
                _id: lobbyId
            }, {
                $set: {
                    lobbyName,
                    lobbyPassword,
                    lobbyResult: lobbyWaitingForResult
                }
            })
        }
        return result


    } catch (error) {
        console.log(error)
        return { status: false, message: 'An error has occured' }
    }
}

async function homePicks(lobbyId: string, pickerId: string, playerId: string): Promise<functionProps> {
    await Lobbies.updateOne({
        _id: lobbyId
    }, {
        $addToSet: {
            homeTeam: playerId
        }
    })
    return { status: true, message: 'true' }
}

async function awayPicks(lobbyId: string, pickerId: string, playerId: string): Promise<functionProps> {
    await Lobbies.updateOne({
        _id: lobbyId
    }, {
        $addToSet: {
            awayTeam: playerId
        }
    })
    return { status: true, message: 'true' }
}