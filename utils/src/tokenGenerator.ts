import { v4 as uuidv4 } from 'uuid'

const md5 = require('md5')



export function tokenGenerator(userId: string): string {
    const dateTime = new Date().getTime()
    return `${uuidv4()}-${md5(userId)}-${md5(dateTime)}`
}