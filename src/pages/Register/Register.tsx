import React, { useState} from "react"
import {useNavigate} from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import formStyles from "../../styles/forms.module.css"
import styles from "./register.module.css"
import { register } from "../../services/authService"

export function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)

        if(password !== confirmPassword) {
            setError("As senha não coincidem. Por favor, verifique")
            return
        }

        try {

            const data = await register(name, email, password)

            alert(`Cadastro bem-sucedido! Bem-vindo, ${data.name}. Agora faça o login`)

            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')

            navigate("/")
            
        } catch (error) {
            const errorMessage = (error as {message?: string}).message || "Erro desconhecido"

            console.log(error)
            setError(errorMessage)
        }
        
    }

    return(
            <div className={formStyles.wrapper}>
                {
                    error && (
                        <p className={formStyles.errorMessage} >{error}</p>
                    )
                }

                <form className={formStyles.form} onSubmit={handleSubmit}>
                    <fieldset className={formStyles.field}>
                        <legend className={formStyles.legend}>Cadastro</legend>
                        <Input 
                            label="Digite seu e-mail" 
                            type="email" 
                            placeholder="Digite seu nome aqui"  
                            required
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
                        />

                        <Input
                            label="Digite seu nome"
                            type="text"
                            placeholder="Digite seu nome aqui"
                            required
                            value={name}
                            onChange={(event)=>setName(event.target.value)}
                        />

                        <Input 
                            label="Digite sua senha" 
                            type="password" 
                            placeholder="Digite sua senha aqui"
                            required   
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} 
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