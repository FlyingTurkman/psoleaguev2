// token expires time
export const tokenExpires = 1000 * 60 * 60 * 24 * 14

// username regexp 
export const usernameRegex = /[A-Za-z0-9]/

// match result types
export const matchNotPlayed = 0
export const matchPlaying = 1
export const matchResultWaiting = 2
export const matchHomeWin = 3
export const matchDraw = 4
export const matchAwayWin = 5
export const matchCanceled = 6

// socket events
export const queuesUpdate = 'queues-updates'