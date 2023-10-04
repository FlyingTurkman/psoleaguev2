import { storage } from "./firebaseConfig";
import { ref, uploadString } from 'firebase/storage'



export async function uploadFile({ file, filePath, metaData }: { file: string, filePath: string, metaData?: string }): Promise<boolean> {
    try {
        const storageRef = ref(storage, filePath)
        await uploadString(storageRef, file, 'data_url', { contentType: metaData })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}