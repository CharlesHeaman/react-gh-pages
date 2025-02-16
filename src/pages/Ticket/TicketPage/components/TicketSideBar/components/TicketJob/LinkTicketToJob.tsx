import { Dispatch, SetStateAction, useState } from "react";
import JobSelect from "../../../../../../../components/form/JobSelect/JobSelect";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import putAPI from "../../../../../../../utils/putAPI";

const LinkTicketToJob = (props: {
    ticketID: number,
    ticketType: number,
    job: QuoteResponseData | undefined,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {

    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedJob, setSelectedJob] = useState<QuoteResponseData | undefined>(props.job);

    const linkJob = () => {
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/link_to_job`, {}, {
            job_number: selectedJob?.data.number
        }, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            props.setTicketData(ticketData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const removeJob = () => {
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/link_to_job`, {}, {
            job_number: ''
        }, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            props.setTicketData(ticketData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Link Ticket to Job'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<>
                {props.job !== undefined && <SubmitButton
                    text="Remove"
                    iconFont="not_interested"
                    color="red"
                    left
                    clickFunc={removeJob}
                    submitting={isUpdating}
                    submittingText="Removing..."
                />}
                <SubmitButton
                    text="Link to Job"
                    iconFont="dataset_linked"
                    disabled={selectedJob === undefined}
                    clickFunc={linkJob}
                    submitting={isUpdating}
                    submittingText="Linking..."
                />
            </>}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a job to link to this ticket.</p>
                </GridItem>
                <GridItem title='Job'>
                    <JobSelect
                        selectedJob={selectedJob}
                        setSelectedJob={setSelectedJob}
                        hasSubmitted={false}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default LinkTicketToJob