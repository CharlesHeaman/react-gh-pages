import { useNavigate } from "react-router-dom";
import Label from "../General/Label/Label";
import Skeleton from "../General/Skeleton/Skeleton";
import styles from "./DashboardWidget.module.css"

const DashboardWidget = (props: {
    count?: number,
    title: string,
    text: string,
    iconFont?: string,
    symbolFont?: string,
    negative?: boolean,
    to: string
}) => {
    const navigate = useNavigate();

    const isLoading = props.count === undefined;
    const color = props.count && props.count > 0 ? props.negative ? 'red' : 'dark-blue' : 'light-green'

    return (
        <div 
            className={styles['widget-wrapper']}
            style={{ border: `1px solid ${color ? `rgba(var(--${color}-hl), 0.5)` : 'var(--high-contrast-bg)'}`}}
            onClick={() => navigate(props.to)}
        >
            <div style={{
                display: 'flex',
                gap: 'var(--normal-gap)',
                flexDirection: 'column',
            }}>
                <div style={{ display: 'flex', gap: 'var(--normal-gap)' }}>
                    <div>
                        <Label 
                            iconFont={props.iconFont} 
                            symbolFont={props.symbolFont} 
                            color={color} 
                            massiveIcon
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}>
                        {!isLoading ?
                            <h2><span style={{ fontWeight: '700', fontSize: '1.75em' }}>{props.count ? props.count : 0}</span></h2> :
                            <Skeleton type="title" width={100} height={39}/>
                        }
                        <h2>{props.title}</h2>
                    </div>
                </div>
                <p style={{ color: 'var(--light-grey-text-color)' }}>{props.text}</p>
            </div>
        </div>
    )
}

export default DashboardWidget