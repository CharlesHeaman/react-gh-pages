import { Dispatch, SetStateAction, useState } from "react";
import CheckboxInput from "../../../../../../../components/form/CheckboxInput/CheckboxInput";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import TextareaInput from "../../../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import putAPI from "../../../../../../../utils/putAPI";

const CompleteJob = (props: {
    jobID: number,
    show: boolean,
    hideFunc: () => void,
    setJobData: Dispatch<SetStateAction<QuoteResponseData | undefined>>
}) => {
    // Form States
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [completionDate, setCompletionDate] = useState<Date>(new Date());

    const completeJob = () => {
        setHasSubmitted(true);
        putAPI(`quotes/${props.jobID}/complete`, {}, {
            completion_date: completionDate,
        }, (response: any) => {
            const jobData = response.data;
            props.setJobData(jobData);
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title={"Complete Job"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Complete Job"
                iconFont="check_circle"
                color="dark-blue"
                clickFunc={completeJob}
                submitting={submitting}
            />} 
        >
            <InfoGrid>
                <GridItem title='Completion Date'>
                    <DateInput
                        name="completion_date"
                        value={completionDate}
                        updateFunc={(date: Date, _name: string) => setCompletionDate(new Date(date))}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CompleteJob