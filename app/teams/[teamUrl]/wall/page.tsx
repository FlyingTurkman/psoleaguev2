import { cookies } from "next/headers";
import PageView from "./PageView";
import { teamType, userType, wallType } from "@/types";
import { Teams, Users, Walls } from "@/utils/mongodb/models";
import { notFound } from "next/navigation";





type pageProps = {
    posts: wallType[],
    users: userType[],
    teamId: string | undefined
}



export default async function Page({ params }: { params: { teamUrl: string } }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const { posts, users, teamId }: { posts: wallType[], users: userType[], teamId: string | undefined } = await getWalls(params.teamUrl)
    if (!teamId) {
        notFound()
    }
    return(
        <div>
            <PageView 
            token={token} 
            teamUrl={params.teamUrl}
            initialPosts={posts}
            initialUsers={users}
            teamId={teamId}
            />
        </div>
    )
}


export async function getWalls(teamUrl: string): Promise<pageProps> {
    try {
        const team: teamType | null | undefined = await Teams.findOne({ teamUrl }).sort({ dateTime: -1 }).limit(20)
        if (!team) {
            return { posts: [], users: [], teamId: undefined }
        }

        const posts: wallType[] = await Walls.find({ to: team._id.toString() }).sort({ dateTime: -1 }).limit(20)

        if (posts.length == 0) {
            return { posts: [], users: [], teamId: team._id.toString() }
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

        return { posts: JSON.parse(JSON.stringify(posts)), users: JSON.parse(JSON.stringify(users)), teamId: team._id.toString() }
    } catch (error) {
        console.log(error)
        return { posts: [], users: [], teamId: undefined }
    }
}