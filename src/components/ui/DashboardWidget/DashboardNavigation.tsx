import { useNavigate } from "react-router-dom";
import Label from "../General/Label/Label";
import styles from "./DashboardWidget.module.css";
import hexRgb from "hex-rgb";

const DashboardNavigation = (props: {
    title: string,
    text: string,
    iconFont?: string,
    symbolFont?: string,
    negative?: boolean,
    hex: string | null,
    to: string,
}) => {
    const navigate = useNavigate();
    const color = 'purple'
    const rgb = hexRgb(props.hex ? props.hex : '#000000');

    return (
        <div 
            className={styles['widget-wrapper']}
            style={{ border: `1px solid rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.5)` }}
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
                            hex={props.hex}
                            massiveIcon
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}>
                        <h2><span style={{ fontWeight: '700', fontSize: '1.75em' }}>{props.title}</span></h2>
                        <p style={{ color: 'var(--light-grey-text-color)' }}>{props.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavigation