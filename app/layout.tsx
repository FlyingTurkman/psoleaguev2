import MainMenu from '@/components/MainMenu';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SiteContextProvider from '@/components/SiteContextProvider';
import { lobbyType, queueType, teamType, userType } from '@/types';
import { Lobbies, Queues, Teams, Users } from '@/utils/mongodb/models';
import { ChangeStreamDocument, ObjectId } from 'mongodb';
import LastNews from '@/components/LastNews';
import { io } from 'socket.io-client'
import { lobbiesUpdates, lobbyUpdate, queueUpdate } from '@/utils/src/constants';
import Lobby from '@/components/lobby/Lobby';




const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  let user: userType | null | undefined = null
  let team: teamType | null | undefined = null
  let queue: queueType | null | undefined = null
  let lobby: lobbyType | null | undefined = null
  let lobbies: lobbyType[] = []
  if (token) {
    user = await getUser(token)
    if (user) {
      team = await getTeam(user.teamId)
      queue = await getQueue(user._id.toString())
      lobby = await getLobby(user._id.toString())
      lobbies = await getLobbies()
      const socket = io(`${process.env.socketPath}:${process.env.socketPort}`)
      if (queue) {
        try {
          const queueChangeStream = Queues.watch([], { fullDocument: 'updateLookup'})
          queueChangeStream.on('change', (changeEvent: ChangeStreamDocument) => {
            if (changeEvent.operationType == 'update' && changeEvent.fullDocument) {
              const newQueue = {
                  _id: changeEvent.fullDocument._id.toString(),
                  maxElo: changeEvent.fullDocument.maxElo,
                  minElo: changeEvent.fullDocument.minElo,
                  queueName: changeEvent.fullDocument.queueName,
                  queueUrl: changeEvent.fullDocument.queueUrl,
                  players: changeEvent.fullDocument.players
              }
              if (newQueue?.players?.includes(user?._id.toString())) {
                queue = {
                  _id: newQueue._id.toString(),
                  maxElo: newQueue.maxElo,
                  minElo: newQueue.minElo,
                  queueName: newQueue.queueName,
                  queueUrl: newQueue.queueUrl,
                  players: newQueue.players
                }
                socket.emit(queueUpdate, queue)
              } else {
                queue = null
                socket.emit(queueUpdate, newQueue)
              }
            }
          })
        } catch (error) {
          console.log(error)
        }

        
      }
      try {
        const lobbyChangeStrem = Lobbies.watch([
          {
            $match: {
               'fullDocument.completed': false 
            }
          }
        ], { fullDocument: 'updateLookup' })
        lobbyChangeStrem.on('change', (changeEvent: ChangeStreamDocument) => {
          if (changeEvent.operationType == 'update' && changeEvent.fullDocument) {
            const newLobby: lobbyType = {
              _id: changeEvent.fullDocument._id,
              lobbyName: changeEvent.fullDocument.lobbyName,
              completed: changeEvent.fullDocument.completed,
              players: changeEvent.fullDocument.players,
              awayTeam: changeEvent.fullDocument.awayTeam,
              homeTeam: changeEvent.fullDocument.homeTeam
            }
            const oldLobbies: lobbyType[] = lobbies.filter((l) => l._id.toString() != newLobby._id.toString())
            lobbies = oldLobbies.concat([newLobby])
            socket.emit(lobbyUpdate, newLobby)
            socket.emit(lobbiesUpdates, lobbies)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row bg-gray-50 gap-2 scrollBar`}>
        <SiteContextProvider 
        user={user}
        team={team}
        initialQueue={JSON.parse(JSON.stringify(queue))}
        token={token}
        >
          <MainMenu/>
          {children}
          <LastNews/>
          <Lobby initialLobby={lobby} token={token}/>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </SiteContextProvider>

      </body>
    </html>
  )
}

async function getUser(token: string): Promise<userType | null | undefined> {
  try {
    const resUser = await fetch(`${process.env.appPath}/api/userApi/getCurrentUserApi`, {
      method: 'POST',
      body: JSON.stringify({
        apiSecret: process.env.apiSecret,
        token
      }),
      cache: 'no-cache'
    })

    const res = await resUser.json()

    if (resUser.status == 200) {
      return res
    } else {
      return undefined
    }
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function getTeam(teamId?: string): Promise<teamType | null | undefined> {
  try {
    const resTeam = await fetch(`${process.env.appPath}/api/teamApi/getCurrentTeamApi`, {
      method: 'POST',
      body: JSON.stringify({
        apiSecret: process.env.apiSecret,
        teamId
      }),
      cache: 'no-cache'
    })
    const res = await resTeam.json()
    if (resTeam.status == 200) {
      return res
    } else {
      return undefined
    }
  } catch (error) {
    console.log(error)
    return undefined
  }
}


async function getQueue(userId: string): Promise<queueType | null | undefined> {
  try {
    const queue: queueType | null | undefined = await Queues.findOne({
      players: { $in: userId }
    })
    return queue
  } catch (error) {
    return undefined
  }
}

async function getLobby(userId: string): Promise<lobbyType | null | undefined> {
  try {
    const lobby = await Lobbies.findOne({
      $and: [
        { completed: false },
        { 'players.playerId': { $in: userId } }
      ]
    })
    return JSON.parse(JSON.stringify(lobby))
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function getLobbies(): Promise<lobbyType[]> {
  try {
    const lobbies: lobbyType[] = await Lobbies.find({
      copleted: false
    })
    return JSON.parse(JSON.stringify(lobbies))
  } catch (error) {
    console.log(error)
    return []
  }
}
