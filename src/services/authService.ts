import {api} from "./api"
import axios from 'axios'



export async function login(email: string , password: string) {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        })

        const { token , user} = response.data

        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))

        return response.data


    } catch (error) {
        console.log(error)

        if(axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.message || "Erro no servidor. Tente novamente"

            throw new Error(errorMessage)
        }

        throw new Error("Falha na comunicação com o servidor")
    }
}

export async function register(name: string, email: string, password: string) {
    try {
        const response = await api.post('/user', {
            name,
            email,
            password
        })

        return response.data

    } catch (error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Erro no registro")
        }

        throw new Error("Falha na comunicação com o servidor")
    }
}