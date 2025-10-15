import { Link } from "react-router-dom"
import styles from "./dashboard.module.css"

export function Dashboard() {
    return(
        <div>
            <h1 className={styles.title}>Sou um DashBoard</h1>
            <p className={styles.changePassword}><Link to={"/profile/change-password"} >Redefinição de senha</Link></p>
        </div>
    )
}