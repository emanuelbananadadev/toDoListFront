import {sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig' 

export async function sendResetEmail(email:string) {
    try {
        await sendPasswordResetEmail(auth, email, {
            url: "http://localhost:5173/forgot-password",
            handleCodeInApp: true
        })

        return
    } catch (error) {
        let errorMessage = "Ocorreu um erro desconhecido ao enviar o e-mail"

        throw new Error(errorMessage)
    }
}