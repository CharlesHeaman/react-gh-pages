import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { useDetectClickOutside } from "react-detect-click-outside";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import styles from "./../MonthInput/MonthInput.module.css";
import formatDate from "../../../utils/formatDate";

const DateInput = (props: {
    name: string,
    value: Date | undefined,
    label?: string,
    min?: Date,
    max?: Date,
    updateFunc: (date: Date, name: string) => void,
    hasSubmitted?: boolean,
    required?: boolean,
}) => {
    const containerRef = useDetectClickOutside({ onTriggered: (event) => {
        const target = event.target;
        if (target) {
            if ((target as HTMLElement).classList.value.includes('react-calendar__tile')) return;
            const parent = (target as HTMLElement).parentElement;
            if (parent) {
                if (parent.classList.value.includes('react-calendar__tile')) return;
            }
        }
        setShowMenu(false);
    }});

    // Menu States
    const [showMenu, setShowMenu] = useState(false);

    const sanitizeEvent = (date: Value) => {
        props.updateFunc(date as Date, props.name);
        setShowMenu(false);
    }

    const getInputValue = (): string | undefined => {
        if (props.value && !isNaN(props.value.getTime())) {
            return props.value.toISOString().substring(0, 10)
        } 
        return undefined;
    }

    const dateEntered = props.value !== undefined;
    const showRequired = !dateEntered && props.hasSubmitted !== undefined && props.hasSubmitted;;
    
    return (
        <>
            <details open={showMenu} ref={containerRef}>
                <summary
                    className={`${styles['details-summary']} ${showMenu ? styles['open'] : ''} no-select`}
                    onClick={(e: any) => {
                        e.preventDefault();
                        setShowMenu(!showMenu)
                    }}
                >
                    <span className="material-icons">event</span>
                    <span style={{
                        whiteSpace: 'nowrap',
                        overflowX: 'hidden',
                        textOverflow: 'ellipsis',
                        flexGrow: 1
                    }}>{props.value ? formatDate(props.value) : ''}</span>
                    <span className="material-icons">arrow_drop_down</span>
                </summary>
                <div 
                    className={styles['menu-wrapper']}
                >
                    <Calendar 
                        defaultView="month"
                        maxDetail="month"
                        minDetail="year"
                        value={getInputValue()}
                        onChange={sanitizeEvent}
                        minDate={props.min}
                        maxDate={props.max}
                    />
                </div>
            </details>
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default DateInput