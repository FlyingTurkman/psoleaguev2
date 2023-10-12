'use client'
import { queueType, siteContextType } from "@/types"
import { IoPerson } from "react-icons/io5"
import { useContext, useState } from "react"
import { SiteContext } from "@/context/SiteContext"
import Button from "../Button"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"







export default function QueueRow({ queue, token }: { queue: queueType, token?: string }) {
    const router = useRouter()
    const { user }: siteContextType = useContext(SiteContext)
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <div className="flex flex-row bg-slate-100 gap-2 border border-gray-300 rounded p-2 items-center">
            <label>{queue.queueName}</label>
            <div className="flex flex-row gap-1 items-center">
                <div className="text-xl">
                    <IoPerson/>
                </div>
                <label>{queue.players?.length?? 0}</label>
            </div>
            {user? (
                <div className="flex ml-auto">
                    {queue.players?.includes(user._id.toString())? (
                        <Button className="buttonRed">Leave Queue</Button>
                    ): (
                        <Button className="buttonPrimary" onClick={joinQueue} loading={loading}>Join Queue</Button>
                    )}
                    
                </div>
            ): null}
        </div>
    )

    async function joinQueue() {
        if (loading) return

        setLoading(true)
        try {
            const resJoin = await fetch(`${process.env.appPath}/api/queueApi/joinQueueApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token,
                    queueId: queue._id.toString()
                })
            })

            const res = await resJoin.json()

            if (resJoin.status == 200) {
                router.refresh()
            } else {
                toast.error(res)
            }
        } catch (error) {
            console.log(error)
            toast.error('An error has occured')
        }
        setLoading(false)
    }
}