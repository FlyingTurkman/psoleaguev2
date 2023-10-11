'use client'
import Button from "@/components/Button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"



export default function PageView() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: ({ username, password }) => {
            toast.promise(login({ username, password }), {
                pending: 'Please wait'
            })
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please type your username'),
            password: Yup.string().required('Please type your password')
        })
    })
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <form className="flex flex-col gap-2 items-center justify-center p-2 rounded bg-slate-200" onSubmit={formik.handleSubmit}>
            <h1 className="text-center">Login</h1>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="username">Username</label>
                <input className="formInput" id="username" onChange={formik.handleChange} maxLength={30}/>
                {formik.errors.username ? (
                    <label className="formError">{formik.errors.username}</label>
                ) : null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="password">Password</label>
                <input className="formInput" type="password" id="password" onChange={formik.handleChange} maxLength={30}/>
                {formik.errors.password ? (
                    <label className="formError">{formik.errors.password}</label>
                ) : null}
            </div>
            <Button className="buttonPrimary" type="submit" loading={loading}>
                Login
            </Button>
        </form>
    )

    async function login({ username, password }: { username: string, password: string }) {
        setLoading(true)
        try {
            const resLogin = await fetch(`${process.env.appPath}/api/userApi/loginApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    username,
                    password
                })
            })

            const res = await resLogin.json()

            if (resLogin.status == 200) {
                toast.success('You are succesfully logged in')
                router.refresh()
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