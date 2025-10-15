import React, { useState} from "react"
import {useNavigate} from 'react-router-dom'
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import formStyles from "../../styles/forms.module.css"
import styles from "./login.module.css"
import { login } from "../../services/authService"
import {Link} from 'react-router-dom'

export function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError(null)

        try {
            const data = await login(email, password)

            const isConfirm = confirm(`Login bem sucedido! Olá ${data.user.name}`)

            if(isConfirm) {
                navigate("/dashboard")
            }

            setEmail('')
            setPassword('')
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
                        <legend className={formStyles.legend}>Login</legend>
                        <Input 
                            label="Digite seu e-mail" 
                            type="email" 
                            placeholder="Digite seu nome aqui"  
                            required
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
                        />
                        <Input 
                            label="Digite sua senha" 
                            type="password" 
                            placeholder="Digite sua senha aqui"
                            required   
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} 
                        />
                        <Button 
                            title="Entrar"    
                            type="submit"
                        />
                        </fieldset>

                        <p>Ainda não tem conta? <Link to={"/register"} >Cadastre-se aqui</Link> </p>
                       
                </form>
            </div>
    )
}