import { FormStep } from '../../form/FormWizardFlex';
import styles from './FormWizard.module.css';
import FormWizardItem from './FormWizardItem/FormWizardItem';

const FormWizard = (props: {
    steps: Array<FormStep>,
    currentStep: number,
    showContinue?: boolean
}) => {
    return (
        <div className={styles['form-wizard-wrapper']}>
            {props.steps.map((step, index) => 
                <FormWizardItem
                    stepNumber={index + 1}
                    heading={(index + 1).toString()}
                    text={step.header}
                    highlight={index + 1 === props.currentStep}
                    isComplete={props.currentStep > index}
                    key={index}
                />
            )}
            {props.showContinue ?
                <FormWizardItem
                    heading='...'
                    text='Continued...'
                /> :
                null
            }
        </div>
    )
}

export default FormWizard