import { ReactNode } from "react"
import styles from "./HeaderFlex.module.css"

const HeaderFlex = (props: {
    children: ReactNode
}) => {
    return (
        <div className={styles['header-flex']}>
            {props.children}
        </div>
    )
}

export default HeaderFlex