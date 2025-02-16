import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { QuoteResponseData } from "../../../../../../types/quote.types";
import CompleteJob from "./components/CompleteJob";

const JobActions = (props: {
    job: QuoteResponseData,
    isInvoiced: boolean,
    setJobData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
}) => {
    const navigate = useNavigate();
    
    const [showComplete, setShowComplete] = useState(false);

    return (
        <>
            {!props.isInvoiced ? <SideBarModule title="Actions">
                {!props.job.data.completion_date === null ? 
                    <SideBarButton
                        text="Complete Job"
                        iconFont="check_circle"
                        color="dark-blue"
                        clickEvent={() => setShowComplete(true)}
                    /> :
                    <SideBarButton
                        text="Create Invoice Request"
                        iconFont="credit_card"
                        color="purple"
                        clickEvent={() => navigate('create_invoice_request')}
                    />}
            </SideBarModule> : null}

            <CompleteJob 
                jobID={props.job.id} 
                show={showComplete} 
                hideFunc={() => setShowComplete(false)} 
                setJobData={props.setJobData}
            />
        </>
    )
}

export default JobActions