import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ProcessTicketInvoiceRequest from './ProcessTicketInvoiceRequest'
import { TicketInvoiceRequestResponseData } from "../../../../../../types/TicketInvoiceRequest.types";

const TicketInvoiceRequestActions = (props: {
    ticketInvoiceRequestID: number,
    requestedValue: number
    setTicketInvoiceRequestData: Dispatch<SetStateAction<TicketInvoiceRequestResponseData | undefined>>
}) => {
    const [showProcess, setShowProcess] = useState(false);

    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Process Invoice Request"
                    iconFont="check_circle"
                    color="dark-blue"
                    clickEvent={() => setShowProcess(true)}
                />
            </SideBarModule>

            <ProcessTicketInvoiceRequest
                ticketInvoiceRequestID={props.ticketInvoiceRequestID}
                requestedValue={props.requestedValue}
                show={showProcess}
                hideFunc={() => setShowProcess(false)}
                setTicketInvoiceRequestData={props.setTicketInvoiceRequestData}
            />
        </>
    )
}

export default TicketInvoiceRequestActions