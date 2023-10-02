'use client'
import { useFormik } from "formik"
import * as Yup from 'yup'
import countries from '../../../utils/src/countries.json'
import { positionLists } from "@/utils/src/positionLists"
import { useEffect, useState, useRef } from "react"
import Button from "@/components/Button"
import { toast } from "react-toastify"
import { usernameRegex } from "@/utils/src/constants"
import { useRouter } from "next/navigation"


export default function PageView() {
    const router = useRouter()
    const usernameRef = useRef<HTMLInputElement>(null)
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            country: 'X',
            mainPosition: -1,
            sidePosition: -1
        },
        onSubmit: ({ email, username,password, country, mainPosition, sidePosition }) => {
            toast.promise(signUp({ email, username,password, country, mainPosition, sidePosition }), {pending: 'User creating please wait.'})
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Please type your email'),
            username: Yup.string().required('Please type your username').min(6, 'Username must be longer than 6 characters').max(30, 'Username must be shorter than 30 charecters'),
            password: Yup.string().required('Please type your password').min(8, 'Password must be longer than 8 characters').max(30, 'Password must be shorter than 30 characters'),
            mainPosition: Yup.number().required('Please choose your main position').min(0, 'Please choose your main position'),
            sidePosition: Yup.number().required('Please choose your side position').min(0, 'Please choose your side position')
        })
    })
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let username = formik.values.username
        if (username.length > 0) {
            let usernameArray = username.split('')
            const validUsername = usernameArray.map((a) => {
                if (usernameRegex.test(a)) {
                    return `${a}`
                } else {
                    return ''
                }

            })
            if (usernameRef.current) {
                usernameRef.current.value = validUsername.toString().replaceAll(',', '')
            }
        }
    }, [formik.values.username])
    return(
        <form className="flex flex-col gap-2 p-2 bg-slate-200 rounded" onSubmit={formik.handleSubmit}>
            <h1 className="text-center">Sign Up</h1>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="email">Email</label>
                <input className="formInput" id="email" onChange={formik.handleChange}/>
                {formik.errors.email || formik.touched.email ? (
                    <label className="formError">{formik.errors.email}</label>
                ): null}

            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="username">Username</label>
                <input ref={usernameRef} className="formInput" id="username" onChange={formik.handleChange} minLength={6} maxLength={30}/>
                {formik.errors.username || formik.touched.username ? (
                    <label className="formError">{formik.errors.username}</label>
                ): null}

            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="password">Password</label>
                <input className="formInput" type="password" id="password" onChange={formik.handleChange} maxLength={30}/>
                {formik.errors.username || formik.touched.password ? (
                    <label className="formError">{formik.errors.username}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="country">Country</label>
                <select className="formInput" id="country" onChange={formik.handleChange}>
                    <option value={'X'}>Choose your country</option>
                    {countries.map((country) => {
                        return(
                            <option key={country.code}>
                                {country.name}
                            </option>
                        )
                    })}
                </select>
                {formik.errors.country || formik.touched.country ? (
                    <label className="formError">{formik.errors.country}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="mainPosition">Main Position</label>
                <select className="formInput" id="mainPosition" onChange={formik.handleChange}>
                    <option value={-1}>Choose main position</option>
                    {positionLists.map((pos) => {
                        return(
                            <option key={`mainPosition${pos.id}`} value={pos.id}>{pos.position}</option>
                        )
                    })}
                </select>
                {formik.errors.mainPosition || formik.touched.mainPosition ? (
                    <label className="formError">{formik.errors.mainPosition}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="sidePosition">Side Position</label>
                <select className="formInput" id="sidePosition" onChange={formik.handleChange}>
                    <option value={-1}>Choose side position</option>
                    {positionLists.map((pos) => {
                        return(
                            <option key={`sidePosition${pos.id}`} value={pos.id}>{pos.position}</option>
                        )
                    })}
                </select>
                {formik.errors.mainPosition || formik.touched.mainPosition ? (
                    <label className="formError">{formik.errors.mainPosition}</label>
                ): null}
            </div>
            <Button className="buttonPrimary" type="submit" loading={loading}>
                Sign Up
            </Button>
        </form>
    )

    async function signUp({ email, username, password, country, mainPosition, sidePosition }: { email: string, username: string, password: string, country: string, mainPosition: number, sidePosition: number }) {
        setLoading(true)
        try {
            const resSignUp = await fetch(`${process.env.appPath}/api/userApi/signUpApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    email,
                    username,
                    password,
                    country,
                    mainPosition,
                    sidePosition
                })
            })
            const res = await resSignUp.json()
            if (resSignUp.status == 200) {
                toast.success(res)
                router.push('/')
            } else {
                toast.error(res)
            }
        } catch (error) {
            console.log(error)
            toast.error('An error has occured')
        }
        setLoading(false)
    }
}