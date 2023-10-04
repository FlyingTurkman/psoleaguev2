import TeamContextProvider from "@/components/teams/TeamContextProvider";
import React from "react";








export default function RootLayout({ children }: { children: React.ReactNode }) {
    return(
        <div className="w-full">
            {children}
        </div>
    )
}