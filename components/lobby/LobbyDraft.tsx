import { lobbyType, userType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { userAvatar } from "@/utils/src/userImages"
import { IoPerson } from "react-icons/io5"
import { Badge } from "../ui/badge"
import { positionLists } from "@/utils/src/positionLists"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"










export default function LobbyDraft({ lobby, players, userId, token }: { lobby: lobbyType | null | undefined, players: userType[], userId?: string, token?: string }) {
    return(
        <Card className="flex flex-col container gap-2">
            <CardHeader className="items-center justify-center">
                <CardTitle>{lobby?.lobbyName}</CardTitle>
                <CardDescription>Waiting for draft</CardDescription>
            </CardHeader>
            <hr/>
            <CardContent className="flex flex-col gap-1">
                <CardDescription>Players waiting for pick</CardDescription>
                <div className="flex flex-row flex-wrap gap-2">
                    {lobby?.players.map((p) => {
                        const player = players.find((user) => user._id.toString() == p.playerId)
                        if (player) {
                            return(
                                <HoverCard key={`playerPickButton${player._id.toString()}`}>
                                    <HoverCardTrigger>
                                        <Button  className="flex flex-row h-full justify-between">
                                            {player.username}
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="flex flex-row gap-2 items-center">
                                        <Avatar>
                                            {player.avatar && (
                                                <AvatarImage src={`${process.env.storagePath}/${userAvatar(player._id.toString(), player?.avatar?? '')}`}></AvatarImage>
                                            )}
                                            <AvatarFallback className="bg-blue-600 text-white">
                                                <IoPerson/>
                                            </AvatarFallback>
                                        </Avatar>
                                        {player.username}
                                        <div className="flex flex-col gap-1">
                                            <Badge>
                                                {positionLists.find((pos) => pos.id == player.mainPosition)?.position}
                                            </Badge>
                                            <Badge>
                                                {positionLists.find((pos) => pos.id == player.sidePosition)?.position}
                                            </Badge>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>  
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </CardContent>
        </Card>
    )
}