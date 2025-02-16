import { useSearchParams } from "react-router-dom";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";

const Navigation = (props: {
    submitData: () => void,
    isSubmitting: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex">
            <SubmitButton
                text="Previous Step" 
                clickFunc={ () => setSearchParams({
                    ...searchParams,
                    step: 'distribute_ticket_time'
                }) }        
                color="light-blue"
                left
            />
            <SubmitButton
                text="Submit Time to Tickets" 
                clickFunc={props.submitData}                        
                color="dark-blue"
                submitting={props.isSubmitting}
                submittingText='Submitting Data...'
            />
        </div>
    )
}

export default Navigation