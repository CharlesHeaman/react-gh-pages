import { ChangeEvent } from "react";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateTicketAttributes } from "../../../types/tickets.types";
import CheckboxInput from "../../../components/form/CheckboxInput/CheckboxInput";
import HoursInput from "../../../components/form/HoursInput/HoursInput";
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput";


const TicketTicketDetailsForm = (props: {
    ticketDetails: CreateTicketAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>
                <GridItem title="Job Description">
                    <TextareaInput 
                        name="job_description"
                        label="Job description"
                        value={props.ticketDetails.job_description} 
                        updateFunc={props.updateParams}
                        required
                        hasSubmitted={props.showErrors}
                        autoFocus
                    />
                </GridItem>
                <GridItem title="Estimated Time" span={2}>
                    <HoursInput 
                        name="estimated_time"
                        value={props.ticketDetails.estimated_time} 
                        label="Estimated time" 
                        updateFunc={props.updateParams} 
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title="Mate Required" span={2}>
                    <CheckboxInput
                        name="is_mate_required"
                        checked={props.ticketDetails.is_mate_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                <GridItem title="RAMS Required" span={2}>
                    <CheckboxInput
                        name="is_rams_required"
                        checked={props.ticketDetails.is_rams_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketTicketDetailsForm