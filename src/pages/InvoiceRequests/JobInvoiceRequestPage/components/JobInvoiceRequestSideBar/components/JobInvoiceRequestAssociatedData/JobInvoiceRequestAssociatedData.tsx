import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import JobInvoiceRequestHistory from "./JobInvoiceRequestHistory";

const JobInvoiceRequestAssociatedData = (props: {
    jobInvoiceRequestID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Invoice Request">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <JobInvoiceRequestHistory 
                jobInvoiceRequestID={props.jobInvoiceRequestID}
                totalCount={props.activityCount}
                show={showHistory} 
                hideFunc={() => setShowHistory(false)}
            /> 
        </>
    )
}

export default JobInvoiceRequestAssociatedData