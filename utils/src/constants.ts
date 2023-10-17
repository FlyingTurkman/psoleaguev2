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
export const queueUpdate = 'queue-update'
export const lobbyUpdate = 'lobby-update'
export const lobbiesUpdates = 'lobbies-updates'
export const lobbyMessages = 'lobby-messages'

// lobby settings
export const lobbyMaxPlayer = 16
export const lobbyAcceptDeadline = 15 * 1000
export const lobbyDraftDeadline = 60 * 1000

// lobby results
export const lobbyWaitingForAccept = 0
export const lobbyWaitingForDraft = 1
export const lobbyCanceled = 2
export const lobbyHomeWins = 3
export const lobbyDraw = 4
export const lobbyAwayWins = 5