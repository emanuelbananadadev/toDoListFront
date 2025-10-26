import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import formStyles from "../../styles/forms.module.css"
import { forgotPassword } from "../../services/authService";

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [sucessMessage, setSucessMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        setSucessMessage(null)
        setIsLoading(true)

        try {
            const resetToken = await forgotPassword(email)

            setSucessMessage("Link de redefinição solicitado com sucesso! Redirecionando...")

            setTimeout(()=> {
                navigate(`/reset-password-confirm?token=${resetToken}&email=${email}`)
            }, 1000)
        } catch (error) {
            const errorMessage = (error as {message?: string}).message || "Erro desconhecido ao solicitar o link"
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className={formStyles.wrapper}>
            {
                (error || sucessMessage) && (
                    <p className={error ? formStyles.errorMessage : formStyles.sucessMessage}>
                        {error || sucessMessage}
                    </p>
                )
            }
            <form className={formStyles.form} onSubmit={handleSubmit}>
                <fieldset className={formStyles.field} disabled={isLoading}>
                    <legend className={formStyles.legend}>Recuperar Senha</legend>

                    <Input
                        label="Digite seu e-mail de cadastro"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        required
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}
                    />

                    <Button
                        title={isLoading ? "Enviando..." : "Solicitar redefinição"}
                        type="submit"
                        disabled={isLoading}
                    />
                </fieldset>
            </form>
        </div>
    )
}