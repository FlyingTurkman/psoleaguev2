import { uuid } from 'uuidv4'

const md5 = require('md5')



export function tokenGenerator(userId: string): string {
    const dateTime = new Date().getTime()
    return `${uuid()}-${md5(userId)}-${md5(dateTime)}`
}