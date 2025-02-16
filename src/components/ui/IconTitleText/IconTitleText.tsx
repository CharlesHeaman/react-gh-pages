import { ReactNode } from "react"
import Label from "../General/Label/Label"

const IconTitleText = (props: {
    title: string | ReactNode,
    text: string | ReactNode,
    iconFont?: string,
    symbolFont?: string,
    color?: string
}) => {
    return (
        <div style={{
            display: 'flex',
            gap: 'var(--normal-gap)'
        }}>
            <div>
                <Label iconFont={props.iconFont} symbolFont={props.symbolFont} text='' color={props.color} bigIcon/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--small-gap)'
            }}>
                <h2>{props.title}</h2>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default IconTitleText