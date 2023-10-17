'use client'
import { IoCheckmark, IoClose, IoRemoveCircleOutline } from "react-icons/io5"
//import Button from "../Button"
import { lobbyType } from "@/types"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { lobbyAcceptDeadline } from "@/utils/src/constants"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"








export default function LobbyJoin({ lobby, userId, token }: { lobby: lobbyType | null | undefined, userId?: string, token?: string }) {
    let accepted = false
    if (lobby?.players) {
        for (const player of lobby?.players) {
            if (player.playerId == userId) {
                accepted = player.accepted
            }
        }
    }
    const [loading, setLoading] = useState<boolean>(false)
    const [counterLeft, setCounterLeft] = useState<number>(lobbyAcceptDeadline)
    useEffect(() => {
        if (!lobby) return
        const dateTime = new Date().getTime()
        let timeLeft = new Date(lobby.acceptDeadline).getTime() - dateTime
        setCounterLeft((timeLeft / lobbyAcceptDeadline) * 100)
        const counterInterval = setInterval(() => {
            const dateTime = new Date().getTime()
            let timeLeft = new Date(lobby.acceptDeadline).getTime() - dateTime
            if (timeLeft < 0) {
                setCounterLeft(0)
                clearInterval(counterInterval)
            }
            setCounterLeft((timeLeft / lobbyAcceptDeadline) * 100)
        }, 1000)

        return () => {
            clearInterval(counterInterval)
        }
    }, [])
    return(
        <Card className="container">
            <CardHeader>
                <CardTitle>Ranked Match Found</CardTitle>
                <CardDescription>Accept and join to lobby</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex flex-row gap-1 flex-wrap">
                    {lobby?.players.map((player, index) => {
                        return(
                            <div key={`lobbyPlayerJoinCheck${player.playerId}-${index}`} className={`flex ${player.accepted ? 'bg-blue-600' : 'bg-red-600'} p-2 rounded-full flex-shrink-0 aspect-square text-xl text-white transition-all`}>
                                {player.accepted ? (
                                    <IoCheckmark/>
                                ): (
                                    <IoClose/>
                                )}
                            </div>
                        )
                    })}
                </div>
            </CardContent>
            <CardContent>
                <Progress className="rotate-180" value={counterLeft}/>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 items-center justify-between p-2">
                {accepted? (
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex w-10 h-10 aspect-square flex-shrink-0 animate-spin items-center justify-center text-xl">
                            <AiOutlineLoading3Quarters/>
                        </div>
                        <CardDescription>Waiting for players</CardDescription>
                    </div>
                ): (
                <div className="flex flex-row w-full gap-2 items-center justify-between p-2">
                    <Button variant={"default"} className="flex" onClick={acceptJoin}>
                        {loading ? (
                            <div className="text-xl animate-spin">
                                <AiOutlineLoading3Quarters/>
                            </div>
                        ): (
                            <div className="text-xl">
                                <IoCheckmark/>
                            </div>
                        )}
                        Accept
                    </Button>
                    <Button variant={"destructive"} className="flex">
                        {loading ? (
                            <div className="text-xl animate-spin">
                                <AiOutlineLoading3Quarters/>
                            </div>
                        ): (
                            <div className="text-xl">
                                <IoClose/>
                            </div>
                        )}
                        Decline
                    </Button>
                </div>
                )}
            </CardFooter>
        </Card>

        /* <div className="flex flex-col gap-2 p-2 rounded-xl">
            <label className="formLabel">Waiting for players</label>
            <div className="flex flex-row gap-1 flex-wrap">
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
            <div className="bg-slate-100 p-1">
                <progress className="h-full w-full ml-auto p-1 rotate-180" value={counterLeft.toString()} max={lobbyAcceptDeadline.toString()}>100</progress>
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
                <Button className="buttonPrimary" onClick={acceptJoin} loading={loading}>Accept</Button>
                <Button className="buttonRed" loading={loading}>Decline</Button>
            </div>
            )}
        </div> */

    )

    async function acceptJoin() {
        if (loading) return

        setLoading(true)
        try {
            const resAccept = await fetch(`${process.env.appPath}/api/lobbyApi/joinLobbyApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token,
                    lobbyId: lobby?._id.toString()
                })
            })

            const res = await resAccept.json()

            if (resAccept.status == 400) {
                toast.error(res)
            } 
        } catch (error) {
            console.log(error)
            toast.error('An error has occured')
        }
        setLoading(false)
    }

    async function declineJoin() {
        
    }
}