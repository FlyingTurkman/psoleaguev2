'use client'
import QueueRow from "@/components/hub/QueueRow"
import { queueType } from "@/types"
import { WVList } from "virtua"
import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'





const socket = io('http://localhost:5000')


export default function PageView({ initialQueues, token }: { initialQueues?: queueType[], token?: string }) {

    const [queues, setQueues] = useState<queueType[]>(initialQueues || [])
    useEffect(() =>{
        socket.on('queues-updates', (updatedQueues: queueType[]) => {
            console.log('queues updated')
            setQueues(updatedQueues)
        })


        return () => {
            socket.off('queues-updates')
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