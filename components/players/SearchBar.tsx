'use client'
import { useFormik } from "formik"
import * as Yup from 'yup'
import Button from "../Button"
import { IoSearch } from "react-icons/io5"
import { useState } from 'react'
import { useContext } from "react"
import { PlayerPageContext } from "@/context/playerPageContext"
import { playerPageContextType } from "@/types"
import { toast } from "react-toastify"





export default function SearchBar() {
    const { setPlayers, setTeams }: playerPageContextType = useContext(PlayerPageContext)
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: ({ username }) => {
            searchPlayer(username)
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please type a username').min(2, 'Please type a username')
        })
    })

    const [loading, setLoading] = useState<boolean>(false)
    return(
        <form className="flex flex-row my-10 sticky top-4 left-0 rounded-full bg-white py-1 px-2 border border-gray-300 z-[1]" onSubmit={formik.handleSubmit}>
            <input className="bg-transparent p-2" id="username" placeholder="Player name" autoComplete="off" onChange={formik.handleChange}/>
            <Button className="text-xl" type="submit" loading={loading}>
                <IoSearch/>
            </Button>
        </form>
    )

    async function searchPlayer(username: string) {
        if (loading) return

        setLoading(true)
        try {
            const resSearch = await fetch(`${process.env.appPath}/api/userApi/searchPlayerByUsernameApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    username
                })
            })

            const res = await resSearch.json()

            if (resSearch.status == 200) {
                setPlayers(res.players)
                setTeams(res.teams)
            } else {
                setPlayers([])
                setTeams([])
            }
        } catch (error) {
            console.log(error)
            toast.error('Search failed')
        }
        setLoading(false)
    }
}