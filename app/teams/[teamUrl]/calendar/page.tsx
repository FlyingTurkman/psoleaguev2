import { matchType, teamType, userType } from "@/types"
import { Matches, Teams, Users } from "@/utils/mongodb/models"
import { ObjectId } from 'mongodb'
import PageView from "./PageView"





type pageProps = {
    matches: matchType[],
    teams: teamType[],
    players: userType[],
    notFound: boolean
}




export default async function Page({ params }: { params: { teamUrl: string } }) {
    const { matches, teams, players, notFound }: pageProps = await getMatches(params.teamUrl)
    return(
        <div>
            <PageView initialTeams={teams} initialMatches={matches} initialPlayers={players}/>
        </div>
    )
}


async function getMatches(teamUrl: string): Promise<pageProps> {
    try {

        const dateTime = new Date()

        const team: teamType | null | undefined = await Teams.findOne({ teamUrl })

        if (!team) {
            return { teams: [], matches: [], players: [], notFound: true }
        }

        const matches: matchType[] = await Matches.find({
            $and: [
                {
                    'home.teamId': team._id.toString()
                },
                {
                    'away.teamId': team._id.toString()
                },
                {
                    dateTime: { $lt: dateTime }
                }
            ]
        }).limit(20)

        if (matches.length == 0) {
            return { teams: [], matches: [], players: [], notFound: false }
        }

        const homeTeamIds: string[] = matches.map((match) => {
            return match.home?.teamId || new ObjectId().toString()
        })

        const awayTeamIds: string[] = matches.map((match) => {
            return match.away?.teamId || new ObjectId().toString()
        })

        const teamIds: string [] = homeTeamIds.concat(awayTeamIds)

        const teams: teamType[] = await Teams.find({
            _id: { $in: teamIds }
        })

        let homePlayerIds: string[] = []

        for (const match of matches) {
            if (match.home && match.home.players) {
                for (const homePlayer of match.home?.players) {
                    if (homePlayer && !homePlayerIds.includes(homePlayer)) {
                        homePlayerIds.push(homePlayer)
                    }
                }
            }

        }

        let awayPlayerIds: string[] = []

        for (const match of matches) {
            if (match.away && match.away.players) {
                for (const awayPlayer of match.away?.players) {
                    if (awayPlayer && !homePlayerIds.includes(awayPlayer)) {
                        awayPlayerIds.push(awayPlayer)
                    }
                }
            }

        }

        let playerIds: string[] = homePlayerIds.concat(awayPlayerIds)

        const players: userType[] = await Users.find({
            _id: { $in: playerIds }
        }, {
            token: 0,
            password: 0,
            email: 0
        })

        return { teams: JSON.parse(JSON.stringify(teams)), matches: JSON.parse(JSON.stringify(matches)), players: JSON.parse(JSON.stringify(players)), notFound: false }
    } catch (error) {
        console.log(error)
        return { teams: [], matches: [], players: [], notFound: true }
    }
}