import { useSearchParams } from 'react-router-dom';
import styles from './FormWizardItem.module.css'

const FormWizardItem = (props: {
    stepNumber?: number,
    heading: string,
    text: string,
    highlight?: boolean,
    isComplete?: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const navigateToStep = () => {
        if (!props.stepNumber || !props.isComplete) return;
        searchParams.set('step', props.stepNumber.toString())
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <div 
            className={`${styles['activity-wrapper']} ${props.isComplete ? styles['complete'] : ''}`}
            onClick={navigateToStep}
        >
            <div className={styles['icon-wrapper']}>
                <div style={{ 
                    backgroundColor: props.isComplete || props.highlight ? 'rgb(var(--dark-blue-hl))' : 'var(--low-contrast-bg)',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <span style={{ color: props.isComplete || props.highlight ? 'var(--light-text-color)' : 'var(--main-text-color)', fontWeight: 600 }}>{props.heading}</span>
                </div>
            </div>
            <div className={styles['text-wrapper']}>
                <h3 
                    style={{ 
                        flexShrink: '1',
                        fontWeight: props.highlight ? 700 : 600
                    }}
                >
                    {props.text}
                </h3>
            </div>
        </div>
    )
}

export default FormWizardItem