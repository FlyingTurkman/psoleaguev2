'use client'
import { useState } from "react"
import Button from "../Button"
import { IoSearch } from "react-icons/io5"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useContext } from "react"
import { teamPageContextType } from "@/types"
import { TeamPageContext } from "@/context/teamPageContext"
import { toast } from "react-toastify"





export default function SearchBar() {
    const { setTeams }: teamPageContextType = useContext(TeamPageContext)
    const formik = useFormik({
        initialValues: {
            teamName: ''
        },
        onSubmit: ({ teamName }) => {
            searchTeam(teamName)
        },
        validationSchema: Yup.object({
            teamName: Yup.string().required('Please type a team name').min(3, 'Please type a team name.')
        })
    })
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <form className="flex flex-row my-10 sticky top-4 left-0 rounded-full bg-white py-1 px-2 border border-gray-300 z-[1]" onSubmit={formik.handleSubmit}>
            <input className="bg-transparent p-2" id="teamName" placeholder="Team name" autoComplete="off" onChange={formik.handleChange}/>
            <Button className="text-xl" type="submit" loading={loading}>
                <IoSearch/>
            </Button>
        </form>
    )

    async function searchTeam(teamName: string) {
        if (loading) return

        setLoading(true)
        try {
            const resSearch = await fetch(`${process.env.appPath}/api/teamApi/searchTeamByNameApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    teamName
                })
            })

            const res = await resSearch.json()

            if (resSearch.status == 200) {
                setTeams(res)
            } else {
                setTeams([])
                toast.error(res)
            }
        } catch (error) {
            console.log(error)
            toast.error('An error has occured')
        }
        setLoading(false)
    }
}