'use client'
import Button from "@/components/Button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react"
import { toast } from "react-toastify"
import { userType, wallType } from "@/types"
import { WVList } from "virtua"
import WallPost from "@/components/teams/WallPost"



export default function PageView({ token, teamUrl, initialPosts, initialUsers, teamId }: { token?: string, teamUrl: string, initialPosts: wallType[], initialUsers: userType[], teamId: string }) {
    const [posts, setPosts] = useState<wallType[]>(initialPosts)
    const [users, setUsers] = useState<userType[]>(initialUsers)
    const formik = useFormik({
        initialValues: {
            content: ''
        },
        onSubmit: ({ content }) => {
            toast.promise(sendPost({ content }), {
                pending: 'Please wait.'
            })
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Please type a post').min(10, 'Need more').max(200, 'It is too much')
        })
    })
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <div className="flex flex-col gap-2 p-2">
            <form className="flex flex-col p-2 bg-slate-100 border border-gray-300" onSubmit={formik.handleSubmit}>
                <label className="formLabel" htmlFor="content">Type your post</label>
                <textarea className="formInput min-h-[125px]" id="content" onChange={formik.handleChange}/>
                <Button className="buttonPrimary my-2 ml-auto" loading={loading}>
                    Post It!
                </Button>
            </form>
            <WVList className="flex flex-col gap-2">
                {posts.map((post) => {
                    const user = users.find((u) => u._id.toString() == post.from)
                    if (user) {
                        /* TODO: buraya observation container eklenecek */
                        return(
                            <WallPost key={`teamWallPost${post._id.toString()}`} post={post} user={user} token={token}/>
                        )
                    } else {
                        return null
                    }
                })}
            </WVList>
        </div>
    )

    async function sendPost({ content }: { content: string }) {
        if (loading) return

        setLoading(true)
        try {
            const resPost = await fetch(`${process.env.appPath}/api/wallApi/sendPostApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token,
                    to: teamId,
                    content
                })
            })

            const res = await resPost.json()

            if (resPost.status == 200) {
                toast.success('Your post succesfully sended')
            } else {
                toast.error(res)
            }
        } catch (error) {
            console.log(error)
            toast.error('An eror has occured')
        }
        setLoading(false)
    }
}