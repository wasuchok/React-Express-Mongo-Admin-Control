import axios from 'axios'
import { useDispatch } from 'react-redux'



export const register = async (value) => {
    await axios.post(`${import.meta.env.VITE_API}/register`, value)
        .then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
}

