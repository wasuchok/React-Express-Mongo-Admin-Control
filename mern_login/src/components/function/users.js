import axios from 'axios'

export const listUsers = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_API}/users`, {
        headers: {
            authtoken
        }
    })
}

export const changeEnabled = async (authtoken,value) => {
    return await axios.post(`${import.meta.env.VITE_API}/change_enabled`,value, {
        headers: {
            authtoken
        }
    })
}

export const changeRole = async (authtoken, value) => {
    return await axios.post(`${import.meta.env.VITE_API}/change_role`,value, {
        headers: {
            authtoken
        }
    })
}

export const removeUsers = async (authtoken, id) => {
    return await axios.delete(`${import.meta.env.VITE_API}/users/${id}`, {
        headers: {
            authtoken
        }
    })
}

export const resetPassword = async (authtoken, id, password) => {
    return await axios.put(`${import.meta.env.VITE_API}/users/${id}`, password , {
        headers : {
            authtoken
        }
    })
}