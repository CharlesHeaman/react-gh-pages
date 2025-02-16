import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { JobInvoiceRequestResponseData } from "../../../../../../types/JobInvoiceRequest";
import ProcessJobInvoiceRequest from "./ProcessJobInvoiceRequest";

const JobInvoiceRequestActions = (props: {
    jobInvoiceRequestID: number,
    requestedValue: number
    setJobInvoiceRequestData: Dispatch<SetStateAction<JobInvoiceRequestResponseData | undefined>>
}) => {
    const [showProcess, setShowProcess] = useState(false);

    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Process Invoice Requests"
                    iconFont="check_circle"
                    color="dark-blue"
                    clickEvent={() => setShowProcess(true)}
                />
            </SideBarModule>

            <ProcessJobInvoiceRequest
                jobInvoiceRequestID={props.jobInvoiceRequestID}
                requestedValue={props.requestedValue}
                show={showProcess}
                hideFunc={() => setShowProcess(false)}
                setJobInvoiceRequestData={props.setJobInvoiceRequestData}
            />
        </>
    )
}

export default JobInvoiceRequestActions