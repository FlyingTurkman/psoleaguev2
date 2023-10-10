import HubHeader from "@/components/hub/HubHeader";











export default function RootLayout({ children }: { children: React.ReactNode }) {
    return(
        <div className="w-full p-2">
            <HubHeader/>
            {children}
        </div>
    )
}