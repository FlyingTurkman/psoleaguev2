import { userType, wallType } from "@/types"
import { Users, Walls } from "@/utils/mongodb/models"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import PageView from "./PageView"








type pageProps = {
    posts: wallType[],
    users: userType[],
    userId: string | undefined
}






export default async function Page({ params }: { params: { username: string } }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const { posts, users, userId }: pageProps = await getWalls(params.username)
    if (!userId) {
        notFound()
    }
    return(
        <div>
            <PageView
            token={token}
            userId={userId}
            initialPosts={posts}
            initialUsers={users}
            />
        </div>
    )
}


export async function getWalls(username: string): Promise<pageProps> {
    try {
        const user: userType | null | undefined = await Users.findOne({username})

        if (!user) {
            return { posts: [], users: [], userId: undefined }
        }

        const posts: wallType[] = await Walls.find({ to: user._id.toString() }).sort({ dateTime: -1 }).limit(20)

        if (posts.length == 0) {
            return { posts: [], users: [], userId: user._id.toString() }
        }

        const userIds: string[] = posts.map((post) => {
            return post.from
        })

        const users: userType[] = await Users.find({
            _id: { $in: userIds }
        }, {
            token: 0,
            password: 0,
            email: 0
        })
        return { posts: JSON.parse(JSON.stringify(posts)), users: JSON.parse(JSON.stringify(users)), userId: user._id.toString() }
    } catch (error) {
        console.log(error)
        return { posts: [], users: [], userId: undefined }
    }
    
}