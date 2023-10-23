'use server'

import { lobbyType, userType } from "@/types"
import { Lobbies, Users } from "@/utils/mongodb/models"


export async function updateLobbyResult( { lobbyId, token }: { lobbyId?: string, token: string}, formData: FormData) {
    try {
        const user: userType | null | undefined = await Users.findOne({ token })
        if (!user) {
            return false
        }

        const lobby: lobbyType | null | undefined = await Lobbies.findOne({ _id: lobbyId })

        if (!lobby) {
            return false
        }

        if (!lobby.homeTeam || !lobby.awayTeam) {
            return false
        }

        if (lobby.homeTeam[0] != user._id.toString() && lobby.awayTeam[0] != user._id.toString()) {
            return false
        }

        const lobbyResult = formData.get('lobbyResult')

        if (!lobbyResult) {
            return false
        }

        if (lobby.homeTeam[0] == user._id.toString()) {
            await Lobbies.updateOne({
                _id: lobby._id.toString()
            }, {
                $set: {
                    homeCaptainResult: parseInt(lobbyResult.toString())
                }
            })
            return true
        } else if (lobby.awayTeam[0] == user._id.toString()) {
            await Lobbies.updateOne({
                _id: lobby._id.toString()
            }, {
                $set: {
                    awayCaptainResult: parseInt(lobbyResult.toString())
                }
            })
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}