'use client'
import QueueRow from "@/components/hub/QueueRow"
import { queueType } from "@/types"
import { WVList } from "virtua"
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { queuesUpdate } from "@/utils/src/constants"





const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)


export default function PageView({ initialQueues, token }: { initialQueues?: queueType[], token?: string }) {

    const [queues, setQueues] = useState<queueType[]>(initialQueues || [])
    useEffect(() =>{
        socket.on(queuesUpdate, (updatedQueues: queueType[]) => {
            setQueues(updatedQueues)
        })


        return () => {
            socket.off(queuesUpdate)
        }
    }, [])
    return(
        <div className="p-2">
            <WVList className="flex flex-col">
                {queues?.map((queue) => {
                    return(
                        <div key={`queueRow${queue._id.toString()}`} className="mx-auto mt-2">
                            <QueueRow queue={queue} token={token}/>
                        </div>
                    )
                })}

            </WVList>
        </div>
    )
}