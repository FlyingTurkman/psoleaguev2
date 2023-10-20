import http from 'http'
import { Server as SocketServer } from 'socket.io'




const httpServer = http.createServer()

const io = new SocketServer(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('socket connected')

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
    })
})


httpServer.listen(3000, () => {
    console.log('Socket running')
})