import { Dispatch, ReactNode, SetStateAction } from "react"
import { useSearchParams } from "react-router-dom"
import FormWizard from "../ui/FormWizard/FormWizard"
import FormStepNavigation from "./FormStepNavigation/FormStepNavigation"

export interface FormStep {
    header: string,
    form: ReactNode,
    isComplete: boolean,
}

const FormWizardFlex = (props: {
    steps: Array<FormStep>,
    maxStepSubmitted: number,
    setMaxStepSubmitted: Dispatch<SetStateAction<number>>,
    resourceName: string,
    actionName?: string,
    iconFont?: string,
    isCreating: boolean,
    createFunc: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const stepParam = searchParams.get('step');
    const currentStep = parseInt(stepParam ? stepParam : '1');

    const setStepParam = (stepIndex: number) => {
        searchParams.set("step", (stepIndex + 1).toString())
        setSearchParams(searchParams, { replace: true })
    }

    const getCurrentForm = (): ReactNode => {
        if (currentStep < 0) setStepParam(0);
        if (currentStep > props.steps.length) setStepParam(props.steps.length - 1);
        for (let testStepIndex = 0; testStepIndex < currentStep - 1; testStepIndex++) {
            if (!props.steps[testStepIndex].isComplete) setStepParam(testStepIndex);
        }
        const currentStepNode = props.steps[currentStep - 1];
        const isLastStep = currentStep >= props.steps.length;
        return <>
            {currentStepNode.form}
            <FormStepNavigation
                formComplete={currentStepNode.isComplete}
                hasSubmitted={props.maxStepSubmitted > currentStep}
                onSubmit={() => !isLastStep ? 
                    props.setMaxStepSubmitted(currentStep) :
                    props.createFunc()
                }
                isSubmitting={props.isCreating}
                iconFont={props.iconFont}
                lastStep={isLastStep}
                submitText={`${!props.actionName ? 'Create' : props.actionName} ${props.resourceName}`}
            />
        </>
    } 

    return (
        <div style={{ display: 'flex', gap: '64px', marginTop: 'var(--big-gap)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormWizard
                    steps={props.steps}
                    currentStep={currentStep}
                />
            </div>
            <div style={{ flexGrow: 1}}>
                {getCurrentForm()}
            </div>
        </div>
    )
}

export default FormWizardFlex