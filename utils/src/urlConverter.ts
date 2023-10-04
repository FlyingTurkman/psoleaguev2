import { usernameRegex } from "./constants"



export function urlConverter(url: string) {
    url = url.replaceAll(' ', '')
    if (url.length > 0) {
        let usernameArray = url.split('')
        const validUsername = usernameArray.map((a) => {
            if (usernameRegex.test(a)) {
                return `${a}`
            } else {
                return ''
            }

        })
        url = validUsername.toString().replaceAll(',', '')
    }
    return url
}