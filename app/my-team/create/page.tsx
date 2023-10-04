import { cookies } from "next/headers";
import PageView from "./PageView";











export default function Page() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    return(
        <div className="flex w-full h-full items-center justify-center">
            <PageView token={token}/>
        </div>
    )
}