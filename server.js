const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')



const httpServer = http.createServer()

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})



io.on('connection', (socket) => {
    console.log('Socket connected: ', socket.id)

    socket.on('queues-updates', (queues) => {
        io.emit('queues-updates', queues)
    })

    socket.on('queue-update', (queue) => {
        io.emit('queue-update', queue)
    })
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
    })
})

httpServer.listen(5000, () => {
    console.log('Socket running on ', 5000)
})