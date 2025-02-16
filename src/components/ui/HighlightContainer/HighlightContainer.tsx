import { ReactNode } from "react"
import styles from './HighlightContainer.module.css'

const HighlightContainer = (props: {
    color: string,
    children: ReactNode
}) => {
    return (
        <div className={`${styles['highlight-wrapper']} ${props.color}`}>{props.children}</div>
    )
}

export default HighlightContainer