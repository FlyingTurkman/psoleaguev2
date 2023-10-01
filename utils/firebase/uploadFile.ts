import { storage } from "./firebaseConfig";
import { ref, uploadString } from 'firebase/storage'



export async function uploadFile({ image, imagePath, metaData }: { image: string, imagePath: string, metaData?: string }): Promise<boolean> {
    try {
        const storageRef = ref(storage, imagePath)
        await uploadString(storageRef, image, 'data_url', { contentType: metaData })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}