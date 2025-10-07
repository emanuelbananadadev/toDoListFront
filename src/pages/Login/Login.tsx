import React, { useState} from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import styles from "./login.module.css"

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        alert(`Tentativa de Login: email-${email} senha-${password}`)
        resetInput()
    }

    function resetInput() {
        setEmail('')
        setPassword('')
    }

    return(
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <fieldset className={styles.field}>
                        <legend className={styles.legend}>Login</legend>
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
                </form>
            </div>
    )
}