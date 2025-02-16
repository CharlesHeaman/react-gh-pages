import { useSearchParams } from "react-router-dom";
import ContainerFooter from "../../ui/Containers/ContainerFooter/ContainerFooter"
import SubmitButton from "../SubmitButton/SubmitButton"

const FormStepNavigation = (props: {
    formComplete: boolean,
    hasSubmitted: boolean,
    lastStep?: boolean,
    submitText?: string,
    submittingText?: string,
    iconFont?: string,
    isSubmitting?: boolean,
    onSubmit: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const stepParam = searchParams.get('step');
    if (stepParam === null) {
        searchParams.set("step", "1")
        setSearchParams(searchParams, { replace: true })

    }
    const currentStep = parseInt(stepParam ? stepParam : '1');

    const goNextStep = () => {
        searchParams.set("step", (currentStep + 1).toString())
        setSearchParams(searchParams, { replace: true })
    }

    const goPreviousStep = () => {
        searchParams.set("step", (currentStep - 1).toString())
        setSearchParams(searchParams, { replace: true })

    }

    return (
        <ContainerFooter>
            <div className="flex">
                {currentStep > 1 ? <SubmitButton
                    text='Previous'
                    iconFont="navigate_before"
                    color="grey"
                    left
                    clickFunc={() => goPreviousStep()}
                /> : null}
                {!props.lastStep ? <SubmitButton
                    text='Next'
                    iconFont="navigate_next"
                    iconAfter
                    color="light-green"
                    clickFunc={() => {
                        props.onSubmit();
                        props.formComplete && goNextStep()
                    }}
                    disabled={props.hasSubmitted && !props.formComplete}
                /> : <SubmitButton
                    text={props.submitText ? props.submitText : ''}
                    iconFont={!props.iconFont ? 'add' : props.iconFont}
                    color="dark-blue"
                    submitting={props.isSubmitting}
                    submittingText={props.submittingText}
                    clickFunc={() => props.onSubmit()}
                    disabled={props.hasSubmitted && !props.formComplete}
                />}
            </div>
        </ContainerFooter>
    )
}

export default FormStepNavigation