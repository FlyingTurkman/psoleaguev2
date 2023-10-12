import { queueType } from "@/types";
import PageView from "./PageView";
import { Queues } from "@/utils/mongodb/models";
import { cookies } from "next/headers";










export default async function Page() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const queues: queueType[] = await getQueues()

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