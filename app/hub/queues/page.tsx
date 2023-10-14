import { queueType } from "@/types";
import PageView from "./PageView";
import { Queues } from "@/utils/mongodb/models";
import { cookies } from "next/headers";
import { ChangeStreamDocument } from "mongodb";









export default async function Page() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    let queues: queueType[] = await getQueues()
    if (queues.length > 0) {
        const queuesChangeStream = Queues.watch([], { fullDocument: 'updateLookup' })
        queuesChangeStream.on('change', async (changeEvent: ChangeStreamDocument) => {
            if (changeEvent.operationType == 'update' && changeEvent.fullDocument) {
                const newQueue: queueType = {
                    _id: changeEvent.fullDocument._id,
                    maxElo: changeEvent.fullDocument.maxElo,
                    minElo: changeEvent.fullDocument.minElo,
                    queueName: changeEvent.fullDocument.queueName,
                    queueUrl: changeEvent.fullDocument.queueUrl,
                    players: changeEvent.fullDocument.players
                }
                const oldQueues: queueType[] = queues.filter((q) => q._id.toString() != newQueue._id.toString())
                queues = oldQueues.concat([newQueue])
            }
        })
    }

    return(
        <div>
            <PageView queues={queues} token={token}/>
        </div>
    )
}



async function getQueues(): Promise<queueType[]> {
    try {
        const queues: queueType[] = await Queues.find()
        return JSON.parse(JSON.stringify(queues))
    } catch (error) {
        console.log(error)
        return []
    }
}

