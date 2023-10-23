'use client'
import { lobbyType, userType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { lobbyAwayWins, lobbyCanceled, lobbyDraw, lobbyHomeWins } from "@/utils/src/constants"
import { updateLobbyResult } from './updateLobbyResult'











export default function LobbyInfo({ lobby, players, token }: { lobby: lobbyType | null | undefined, players: userType[], token: string }) {
    let captainId = ''
    if (lobby?.homeTeam) {
        captainId = lobby.homeTeam[0]
    }
    const hoster = players.find((p) => p._id.toString() == captainId)
    const updateLobbyResultWithToken = updateLobbyResult.bind(null, { lobbyId: lobby?._id.toString(), token})
    return(
        <Card className="flex flex-col container gap-2 max-h-screen scrollBar overflow-auto">
            <CardHeader className="flex flex-col items-center">
                <CardTitle>
                    {lobby?.lobbyName}
                </CardTitle>
                <CardDescription>
                    Waiting for result
                </CardDescription>
            </CardHeader>
            <hr/>
            <CardContent className="flex flex-col gap-1 items-center justify-start">
                <CardDescription><b>{hoster?.username}</b> is host.</CardDescription>
                <CardContent className="flex flex-col items-center">
                    <b>Lobby Name:</b> {lobby?.lobbyName}
                    <br/>
                    <b>Lobby Password:</b> {lobby?.lobbyPassword}
                </CardContent>
            </CardContent>
            <hr/>
            <CardContent>
                <form action={updateLobbyResultWithToken} className="flex flex-col gap-2 items-center justify-center">
                    <label className="lobbyLabel">Lobby Result</label>
                    <select className="formInput" id="lobbyResult" name="lobbyResult">
                        <option value={lobbyHomeWins}>Home Wins</option>
                        <option value={lobbyDraw}>Draw</option>
                        <option value={lobbyAwayWins}>Away Wins</option>
                        <option value={lobbyCanceled}>Canceled</option>
                    </select>
                    <Button type="submit">Confirm</Button>
                </form>
            </CardContent>
        </Card>
    )
}