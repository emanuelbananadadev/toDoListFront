import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import formStyles from "../../styles/forms.module.css"
import { sendResetEmail } from "../../services/firebaseAuthService";
import styles from "./forgotpassword.module.css"
import { useSearchParams } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import axios from "axios";

export function ForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams] = useSearchParams()
    const oobCode = searchParams.get("oobCode")
    const mode = searchParams.get("mode")

    useEffect(()=>{
        setError(null)
        setSuccessMessage(null)
    }, [mode])

    useEffect(()=> {
        async function fetchEmailFromCode() {
            if(!oobCode) {
                return
            }

            try {
                const userEmail = await verifyPasswordResetCode(auth, oobCode)
                setEmail(userEmail)
            } catch (error) {
                setError("Link inválido ou expirado. Solicite novamente a redefinição")
            }
        }
        fetchEmailFromCode()
    }, [oobCode])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        setSuccessMessage(null)
        setIsLoading(true)

        try {
            await sendResetEmail(email)

            setSuccessMessage("Se o email estiver cadastrado, você receberá um link de redefinição")

            setEmail('')
        } catch (error) {
            const errorMessage = (error as {message?: string}).message || "Erro desconhecido ao enviar e-mail"

            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleResetPassword(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        setSuccessMessage(null)
        setIsLoading(true)

        if(!oobCode) {
            setError("Código de redefinição inválido")
            setIsLoading(false)
            return
        }

        try {

            const email = await verifyPasswordResetCode(auth, oobCode)

            await confirmPasswordReset(auth, oobCode, newPassword)

            await axios.put("http://localhost:3333/user/reset-password", {
                email,
                newPassword
            })
            
            setSuccessMessage("Senha redefinida com sucesso! Você já pode logar")

            setTimeout(()=> navigate("/login"), 3000)
            setNewPassword("")
        } catch (error) {
            console.log(error)
            setError("Erro ao redefinir a senha. Tente novamente")
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className={formStyles.wrapper}>
            {
                (error || successMessage) && (
                    <p className={error ? formStyles.errorMessage : styles.successMessage }>
                        {error || successMessage}
                    </p>
                )
            }


            {
                (!oobCode && (
                    <form className={formStyles.form} onSubmit={handleSubmit}>
                        <fieldset className={formStyles.field} disabled={isLoading}>
                            <legend className={formStyles.legend}>Esqueci minha senha</legend>

                            <Input
                                label="Digite seu e-mail"
                                type="email"
                                placeholder="Seu e-mail cadastrado"
                                required
                                value={email}
                                onChange={(event)=> setEmail(event.target.value)}
                            />

                            <Button
                                title={isLoading ? "Enviando..." : "Enviar Link de redefinição"}
                                type="submit"
                                disabled={isLoading}
                            />
                        </fieldset>
                    </form>
                ))
            }
            {
                (oobCode && mode === "resetPassword" && (
                    <form onSubmit={handleResetPassword}>
                        <fieldset>
                            <legend>Redefinir senha</legend>
                            {email && (
                                <p style={{textAlign: "center"}}>Redefinindo a senha de: <strong>{email}</strong></p>
                            )}
                            <Input
                                label="Nova senha"
                                type="password"
                                placeholder="Digite sua nova senha"
                                required
                                value={newPassword}
                                onChange={(event)=>setNewPassword(event.target.value)}
                            />

                            <Button
                                title={isLoading ? "Redefinindo..." : "Redefinir senha"}
                                type="submit"
                                disabled={isLoading}
                            />

                        </fieldset>
                    </form>
                ))
            }

        </div>
    )
}