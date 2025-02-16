import { ReactNode } from "react"
import Label from "../../General/Label/Label"
import HighlightContainer from "../../HighlightContainer/HighlightContainer"

const Alert = (props: {
    color: string,
    iconFont: string,
    title: string,
    text: ReactNode
}) => {
    return (
        <HighlightContainer color={props.color}>
            <div style={{
                display: 'flex',
                gap: 'var(--normal-gap)',
                alignItems: 'center'
            }}>
                <Label iconFont={props.iconFont} text='' color={props.color} mediumIcon/>
                <div style={{
                    display: 'flex',
                    gap: 'var(--small-gap)',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexGrow: 1
                }}>
                    <h3 style={{ whiteSpace: 'nowrap' }}>{props.title}</h3>
                    <p style={{ whiteSpace: 'nowrap' }}>{props.text}</p>
                </div>
            </div>
        </HighlightContainer>
    )
}

export default Alert