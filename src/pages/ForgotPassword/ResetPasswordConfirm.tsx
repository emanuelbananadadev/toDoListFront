import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import formStyles from "../../styles/forms.module.css"
import { changePasswordConfirm } from "../../services/authService"
import { removeTokenInfo } from "../../utils/authUtils"

export function ResetPasswordConfirm() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const token = searchParams.get('token')
    const emailFromUrl = searchParams.get('email')

    if(!token || !emailFromUrl) {
        navigate('/forgot-password')
        return <p>Token inválido ou faltando. Redirecionando...</p>
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            if(newPassword !== confirmNewPassword) {
                setError("A nova senha e a confirmação devem ser idênticas")
                setIsLoading(false)
                return
            }

            await changePasswordConfirm({
                token: token!,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            })

            alert("Senha redefinida com sucesso! Faça login com sua nova senha")

            removeTokenInfo()
            navigate("/login")

    
        } catch (error) {
            const errorMessage = (error as {message?: string}).message || "Erro desconhecido ao redefinir a senha."
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className={formStyles.wrapper}>
            {
                (error && (
                    <p className={formStyles.errorMessage} >{error}</p>
                ))
            }

            <form className={formStyles.form} onSubmit={handleSubmit}>
                <fieldset className={formStyles.field} disabled={isLoading}>
                    <legend className={formStyles.legend}>Nova senha para {emailFromUrl}</legend>

                    <Input
                        label="Nova senha"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        required
                        value={newPassword}
                        onChange={(event)=> setNewPassword(event.target.value)}
                    />

                    <Input
                        label="Confirma a Nova Senha"
                        type="password"
                        placeholder="Confirme a nova senha"
                        required
                        value={confirmNewPassword}
                        onChange={(event)=> setConfirmNewPassword(event.target.value)}
                    />

                    <Button
                        title={isLoading ? "Redefinindo..." : "Redefinir Senha"}
                        type="submit"
                        disabled={isLoading}
                    />
                </fieldset>
            </form>

        </div>
    )
}