'use client'
import QueueRow from "@/components/hub/QueueRow"
import { queueType } from "@/types"
import { WVList } from "virtua"










export default function PageView({ queues, token }: { queues?: queueType[], token?: string }) {
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