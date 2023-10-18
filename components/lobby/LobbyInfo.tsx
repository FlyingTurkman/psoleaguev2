'use client'
import { lobbyType, userType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"












export default function LobbyInfo({ lobby, players }: { lobby: lobbyType | null | undefined, players: userType[] }) {
    let captainId = ''
    if (lobby?.homeTeam) {
        captainId = lobby.homeTeam[0]
    }
    const hoster = players.find((p) => p._id.toString() == captainId)
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
            <CardContent className="flex flex-col gap-1">
                <CardDescription><b>{hoster?.username}</b> is host.</CardDescription>
                <CardContent>
                    <b>Lobby Name:</b> {lobby?.lobbyName}
                    <br/>
                    <b>Lobby Password:</b> {lobby?.lobbyPassword}
                </CardContent>
            </CardContent>
        </Card>
    )
}