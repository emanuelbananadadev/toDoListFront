import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import formStyles from "../../styles/forms.module.css"
import { sendResetEmail } from "../../services/firebaseAuthService";
import styles from "./forgotpassword.module.css"

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

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

            setEmail(errorMessage)
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
        </div>
    )
}