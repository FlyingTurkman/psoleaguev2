'use client'
import Image from "next/image"
import { userAvatar } from "@/utils/src/userImages"
import { imageLoader } from "@/utils/src/imageLoader"
import { IoPeople, IoTrashBin } from "react-icons/io5"
import Link from "next/link"
import { siteContextType, userType, wallType } from "@/types"
import Button from "../Button"
import { useState, useContext } from "react"
import { SiteContext } from "@/context/SiteContext"
import { toast } from 'react-toastify'



export default function WallPost({ post, user, token }: { post: wallType, user: userType, token?: string }) {
    const siteData: siteContextType = useContext(SiteContext)
    const currentUser = siteData.user
    const currentTeam = siteData.team
    const [loading, setLoading] = useState<boolean>(false)
    let showTrashBin: boolean = false

    if (currentUser?._id.toString() == post.from) showTrashBin = true
    if (currentTeam?._id.toString() == post.to) {
        if (currentTeam.owner == currentUser?._id.toString()) showTrashBin = true
        if (currentTeam.captain == currentUser?._id.toString()) showTrashBin = true
        if (currentTeam.coCaptain == currentUser?._id.toString()) showTrashBin = true
    }
    return(
        <div>
            <div className="flex flex-row relative p-2 rounded items-start gap-2">
                <Link href={`/players/${user.username.toString()}`} className="flex flex-row gap-1 items-center link">
                    <div className="flex w-8 h-8 rounded-full bg-blue-600 text-white text-2xl items-center justify-center">
                        {user.avatar ? (
                            <Image
                            src={`${process.env.storagePath}/${userAvatar(user._id.toString(), user.avatar)}`}
                            loader={imageLoader}
                            alt={user.username}
                            width={32}
                            height={32}
                            className="flex w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <IoPeople/>
                        )}
                    </div>
                    <label className="cursor-pointer font-semibold">{user.username}</label>
                </Link>
                <div className="flex flex-col w-full">
                    <p className="text-gray-600 p-1">{post.content}</p>
                    <p className="text-gray-600 text-xs ml-auto">{new Date(post.dateTime).toLocaleString()}</p>
                </div>
                {showTrashBin && (
                    <div className="flex absolute top-1 right-1">
                        <Button className="buttonRed" loading={loading} onClick={deletePost}>
                            <IoTrashBin/>
                        </Button>
                    </div>
                )}
            </div>
            <hr/>
        </div>
    )

    async function deletePost() {
        if (loading) return

        setLoading(true)
        try {
            const resDelete = await fetch(`${process.env.appPath}/api/wallApi/deletePostApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token,
                    postId: post._id.toString()
                })
            })

            const res = await resDelete.json()

            if (resDelete.status == 200) {
                toast.success(res)
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