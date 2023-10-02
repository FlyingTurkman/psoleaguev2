'use client'
import { useFormik } from "formik"
import * as Yup from 'yup'
import Button from "../Button"
import { IoSearch } from "react-icons/io5"
import { useState } from 'react'






export default function SearchBar() {
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: ({ username }) => {

        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please type a username').min(2, 'Please type a username')
        })
    })

    const [loading, setLoading] = useState<boolean>(false)
    return(
        <form className="flex flex-row my-10 sticky top-4 left-0 rounded-full bg-white py-1 px-2 border border-gray-300 z-[1]" onSubmit={formik.handleSubmit}>
            <input className="bg-transparent p-2" placeholder="Player name"/>
            <Button className="text-xl" type="submit" loading={loading}>
                <IoSearch/>
            </Button>
        </form>
    )
}