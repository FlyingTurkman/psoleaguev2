'use client'
import { siteContextType } from "@/types";
import { createContext } from "react";




export const SiteContext = createContext<siteContextType>({
    user: null,
    team: null,
    queue: null
})