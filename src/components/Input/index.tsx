import type React from 'react'
import styles from './input.module.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

export function Input({label, ...rest}: InputProps) {
    return(
            <div className={styles.wrapper}>
                <label className={styles.label}>{label}</label>
                <input className={styles.input} {...rest} />
            </div>
    )
}