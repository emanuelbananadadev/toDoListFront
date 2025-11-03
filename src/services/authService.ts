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

export async function forgotPassword(email: string) {
    try {
        const response = await api.post('/auth/forgot-password', { email })

        const { resetToken, message} = response.data

        if(!resetToken) {
            throw new Error(message || "Não foi possível iniciar a redefinição de senha")
        }

        return resetToken
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Erro ao solicitar token")
        }

        throw new Error("Falha na comunicação com o servidor")
    }
}

type ResetPasswordData = {
    token: string
    newPassword: string
    confirmNewPassword: string
}

export async function changePasswordConfirm(data: ResetPasswordData) {
    try {
        await api.patch('/auth/reset-password-confirm', {
            token: data.token,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword
        })

        return 
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            let errorMessage = "Falha na redefinição de senha"

            throw new Error(errorMessage)
        }

        throw new Error("Falha na comunicação com o servidor")
    }
}

export function logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
}