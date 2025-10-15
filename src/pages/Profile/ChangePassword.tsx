import React, { useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import formStyles from "../../styles/forms.module.css"
import styles from "./changepassword.module.css"
import { changePassword } from "../../services/userService"
import { getLoggedUser } from "../../utils/authUtils"

export function ChangePassword() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        
        try {
            if(newPassword !== confirmPassword) {
                setError("A nova senha e a confirmação devem ser idênticas")
                return
            }

            const user = getLoggedUser()
            if(!user) {
                setError("Sessão expirada. Faça login novamente")
                navigate("/login")
                return
            }

            await changePassword({
                currentPassword: password,
                newPassword: newPassword,
                confirmNewPassword: confirmPassword
            })

            alert("Senha alterada com sucesso!")
            navigate("/login")
        } catch (error) {
            const errorMessage = (error as {messsage?: string}).messsage || "Erro desconhecido ao alterar senha"
            setError(errorMessage)
        }
    }

    useEffect(()=>{
        const user = getLoggedUser()
        if(user) {
            setUserName(user.name)
        }
    }, [])

    return(
            <div className={formStyles.wrapper}>
                {
                    error && (
                        <p className={formStyles.errorMessage} >{error}</p>
                    )
                }

                <form className={formStyles.form} onSubmit={handleSubmit}>
                    <fieldset className={formStyles.field}>
                        <legend className={formStyles.legend}>Redefinição de Senha</legend>

                        <Input
                            label="Nome do usuário"
                            type="text"
                            placeholder="Nome"
                            required
                            value={userName}
                            disabled
                        />

                        <Input 
                            label="Digite sua senha antiga" 
                            type="password" 
                            placeholder="Digite sua senha aqui"
                            required   
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} 
                        />

                        <Input 
                            label="Digite sua nova senha" 
                            type="password" 
                            placeholder="Digite sua senha aqui"
                            required   
                            value={newPassword}
                            onChange={(event)=>setNewPassword(event.target.value)} 
                        />

                        <Input 
                            label="Confirme sua senha" 
                            type="password" 
                            placeholder="Confirme sua senha aqui"
                            required   
                            value={confirmPassword}
                            onChange={(event)=>setConfirmPassword(event.target.value)} 
                        />

                        <Button 
                            title="Entrar"    
                            type="submit"
                        />
                        </fieldset>
                </form>
            </div>
    )
}