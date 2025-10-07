import type React from 'react'
import styles from './button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string
}

export function Button({title, ...rest}:ButtonProps) {
    return(
        <div className={styles.btn}>
            <button className={styles.btn_title} {...rest} >{title}</button>
        </div>
    )
}