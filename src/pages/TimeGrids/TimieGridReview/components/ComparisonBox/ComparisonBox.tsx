import styles from "./ComparisonBox.module.css"

const ComparisonBox = (props: {
    label: string,
    value: number,
    comparison?: number
    suffix?: string,
    prefix?: string,
    icon: string
}) => {

    const getColour = () => {
        if (props.comparison === undefined) {
            return 'red'
        }
        if (props.value - props.comparison === 0) {
            return 'grey'
        }
        if (props.value < props.comparison) {
            return 'light-green'
        } 
        if (props.value > props.comparison) {
            return 'red'
        } 
        return 'dark-blue';
    }
    return (
        <div className={`${getColour()} ${styles['comparison-box']}`}>
            <span className={`material-icons ${styles['icon']}`}>{props.icon}</span>
            <div>
                <span className={styles['label']}>{props.label}</span>
                <div>
                    <span>{props.prefix}</span>
                    <span className={styles['value']}>{props.value}</span>
                    <span>{props.suffix}</span>
                    {props.comparison !== undefined && (props.value - props.comparison) !== 0 ? <span className={styles['difference']}>
                        &nbsp;(
                            <span>{props.prefix}</span>
                            {`${(props.value - props.comparison) > 0 ? 'over-claimed ' : 'under-claimed '}${Math.abs(props.value - props.comparison)}`}
                            <span>{props.suffix}</span>
                        )
                    </span> : null}

                </div>
            </div>
        </div>
    )
}

export default ComparisonBox