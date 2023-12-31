'use client'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useRef, useState } from "react"
import { urlConverter } from "@/utils/src/urlConverter"
import countries from '../../../utils/src/countries.json'
import { useFilePicker } from "use-file-picker"
import { FileSizeValidator, ImageDimensionsValidator } from "use-file-picker/validators"
import { IoImage, IoPeople } from "react-icons/io5"
import Button from "@/components/Button"
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from "next/navigation"




export default function PageView({ token }: { token?: string }) {
    const router = useRouter()
    const teamUrlRef = useRef<HTMLInputElement>(null)
    const formik = useFormik({
        initialValues: {
            teamName: '',
            teamTag: '',
            teamUrl: '',
            country: ''
        },
        onSubmit: ({ teamName, teamTag, teamUrl, country }) => {
            console.log(formik.errors)
            toast.promise(createTeam({ teamName, teamTag, teamUrl, country }), {
                pending: 'Please wait. Your team is creating.'
            })
        },
        validationSchema: Yup.object({
            teamName: Yup.string().required('Please type a team name').min(3, 'Team name must include more than 3 characters').max(30, 'Team name must be less than 30 characters'),
            teamTag: Yup.string().uppercase('Team tag must be a uppercase').required('Please type a team tag').min(3, 'Team name must include more than 3 characters').max(5, 'Team tag must be less than 5 characters'),
            teamUrl: Yup.string().required('Please type your team url').min(5, 'Team name must include more than 5 characters').max(30, 'Team tag must be less than 30 characters'),
            country: Yup.string().required('Please choose your country')
        })
    })
    const { openFilePicker, filesContent } = useFilePicker({
        accept: '.jpg, .png, .jpeg',
        multiple: false,
        validators: [
            new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })
        ],
        readAs: 'DataURL'
    })
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (formik.values.teamUrl.length > 0) {
            const newTeamUrl = urlConverter(formik.values.teamUrl)
            if (teamUrlRef.current) {
                teamUrlRef.current.value = newTeamUrl
            }
        }
    }, [formik.values.teamUrl])
    return(
        <form className="flex flex-col gap-2 bg-slate-100 my-10 rounded p-2 border border-gray-300" onSubmit={formik.handleSubmit}>
            <h1 className="text-center">Create A Team</h1>
            <hr/>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="teamName">Team Name</label>
                <input className="formInput" id="teamName" onChange={formik.handleChange}/>
                {formik.errors.teamName || formik.touched.teamName ? (
                    <label className="formError">{formik.errors.teamName}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="teamTag">Team Tag</label>
                <input className="formInput uppercase" id="teamTag" onChange={((e) => formik.setFieldValue('teamTag', urlConverter(e.target.value)))}/>
                {formik.errors.teamTag || formik.touched.teamTag ? (
                    <label className="formError">{formik.errors.teamTag}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="teamUrl">Team URL</label>
                <input ref={teamUrlRef} className="formInput" id="teamUrl" onChange={((e) => formik.setFieldValue('teamUrl', urlConverter(e.target.value)))}/>
                {formik.errors.teamUrl || formik.touched.teamUrl ? (
                    <label className="formError">{formik.errors.teamUrl}</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel" htmlFor="country">Country</label>
                <select className="formInput" id="country" onChange={formik.handleChange}>
                    <option>Choose your country</option>
                    {countries.map((country) => {
                        return(
                            <option key={`countryOption${country.code}`} value={country.code}>{country.name}</option>
                        )
                    })}
                </select>
                {formik.errors.country? (
                    <label className="formError">Please choose a country</label>
                ): null}
            </div>
            <div className="flex flex-col">
                <label className="formLabel">Logo</label>
                <div className="aspect-square group mx-auto w-60 h-60 relative rounded-full">
                    {filesContent[0] && filesContent[0].content ? (
                        <img src={filesContent[0].content} className="w-full h-full aspect-square object-cover rounded-full"></img>
                    ): (
                        <div className="flex w-full h-full text-8xl bg-white text-blue-800 items-center justify-center rounded-full">
                            <IoPeople/>
                        </div>
                    )}
                    <Button className="buttonPrimary !rounded-full text-2xl invisible border-white border group-hover:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" type="button" onClick={openFilePicker}>
                        <IoImage/>
                    </Button>
                </div>
            </div>
            <Button className="buttonPrimary" type="submit" loading={loading}>
                Create Team
            </Button>
        </form>
    )

    async function createTeam({ teamName, teamTag, teamUrl, country }: { teamName: string, teamTag: string, teamUrl: string, country: string }) {
        if (loading) return

        console.log(formik.errors)
        setLoading(true)
        try {
            let image: string | undefined = undefined
            let imageType = ''
            let imageName = uuidv4()
            if (filesContent.length > 0 && filesContent[0].content) {
                image = filesContent[0].content
                if (image.includes('png')) {
                    imageType = 'png'
                } else if (image.includes('jpg')) {
                    imageType = 'jpg'
                } else if (image.includes('jpeg')) {
                    imageType = 'jpeg'
                }
            }
            const resCreate = await fetch(`${process.env.appPath}/api/teamApi/createTeamApi`, {
                method: 'POST',
                body: JSON.stringify({
                    apiSecret: process.env.apiSecret,
                    token,
                    teamName,
                    teamTag,
                    teamUrl,
                    country,
                    image: image ? `${imageName}.${imageType}` : undefined,
                    imageDataUrl: image
                })
            })

            const res = await resCreate.json()

            if (resCreate.status == 200) {
                toast.success(res)
                router.push('/my-team')
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