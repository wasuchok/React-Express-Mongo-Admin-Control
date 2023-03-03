import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LoadingToRedirect from './LoadingToRedirect'
import axios from 'axios'

const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}))

    const [ok, setOk] = useState(false)

    const currentAdmin = async (authtoken) => {
        await axios.post(`${import.meta.env.VITE_API}/current_admin`, {} ,{
            headers: {
                authtoken
            }
        }).then((response) => {
            console.log(response)
            setOk(true)
        }).catch((err) => {
            console.log(err)
            setOk(false)
        })
    }

    useEffect(() => {

        if(user && user.token) {
            currentAdmin(user.token)
        }

    }, [user])

    return ok ? children : <LoadingToRedirect />
}

export default AdminRoute