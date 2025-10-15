import axios from 'axios'
import { api } from './api'

type ChangePasswordData = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export async function changePassword(data: ChangePasswordData) {
    try {
        await api.patch('/user/change-password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword
        })

    } catch (error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Falha ao alterar senha")
        }

        throw new Error("Falha na comunicação com o servidor")
    }
}