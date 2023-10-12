import MainMenu from '@/components/MainMenu';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SiteContextProvider from '@/components/SiteContextProvider';
import { queueType, teamType, userType } from '@/types';
import { Queues, Teams, Users } from '@/utils/mongodb/models';
import { ChangeStreamDocument, ObjectId } from 'mongodb';
import LastNews from '@/components/LastNews';
import cron from 'node-cron'


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
  if (token) {
    user = await getUser(token)
    if (user) {
      team = await getTeam(user.teamId)
      queue = await getQueue(user._id.toString())
      if (queue) {
        try {
          const queueChangeStream = Queues.watch([], { fullDocument: 'updateLookup'})
      
          queueChangeStream.on('change', (changeEvent: ChangeStreamDocument) => {
            if (changeEvent.operationType == 'update' && changeEvent.fullDocument) {
              const newQueue = changeEvent.fullDocument
              if (newQueue.players.includes(user?._id.toString())) {
                queue = {
                  _id: newQueue._id.toString(),
                  maxElo: newQueue.maxElo,
                  minElo: newQueue.minElo,
                  queueName: newQueue.queueName,
                  queueUrl: newQueue.queueUrl,
                  players: newQueue.players
                }
              } else {
                queue = null
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }


  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row bg-gray-50 gap-2 scrollBar`}>
        <SiteContextProvider 
        user={user}
        team={team}
        queue={JSON.parse(JSON.stringify(queue))}
        token={token}
        >
          <MainMenu/>
          {children}
          <LastNews/>
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
    console.log(error)
    return undefined
  }
}

async function updateLastLogin(queue: queueType | null | undefined, userId?: string) {

  const interval = setInterval(async () => {
    console.log('last login updating')

    try {
      await Users.updateOne({
        _id: userId
      }, {
        $set: { lastLogin: new Date() }
      })
    } catch (error) {
      console.log(error)
    }
  }, 5000)

  return () => {
    console.log('last login closed')
    clearInterval(interval)
  }
}
