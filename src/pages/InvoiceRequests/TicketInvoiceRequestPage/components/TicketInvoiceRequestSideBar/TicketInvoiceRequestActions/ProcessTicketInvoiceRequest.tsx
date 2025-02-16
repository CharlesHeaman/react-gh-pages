import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import DateInput from "../../../../../../components/form/DateInput/DateInput";
import MoneyInput from "../../../../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketInvoiceRequestResponseData } from "../../../../../../types/TicketInvoiceRequest.types";
import putAPI from "../../../../../../utils/putAPI";
import updateStateDateParams from "../../../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../../../utils/updateStateParams/updateStateParams";

export interface ProcessTicketInvoiceRequestAttributes {
    invoice_value: string,
    invoice_number: string,
    invoice_date: Date
}

const ProcessTicketInvoiceRequest = (props: {
    ticketInvoiceRequestID: number,
    requestedValue: number
    show: boolean,
    hideFunc: () => void,
    setTicketInvoiceRequestData: Dispatch<SetStateAction<TicketInvoiceRequestResponseData | undefined>>
}) => {

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [processAttributes, setProcessAttributes] = useState<ProcessTicketInvoiceRequestAttributes>({
        invoice_value: props.requestedValue.toString(),
        invoice_number: '',
        invoice_date: new Date()
    });

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProcessAttributes);
    }

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setProcessAttributes);
    }
    
    const processInvoiceRequest = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`ticket_invoice_requests/${props.ticketInvoiceRequestID}/process`, {}, processAttributes, (response: any) => {
            const ticketInvoiceRequestData: TicketInvoiceRequestResponseData = response.data;
            props.setTicketInvoiceRequestData(ticketInvoiceRequestData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = (
        processAttributes.invoice_value.length > 0 &&
        processAttributes.invoice_number.length > 0 
    )

    return (
        <WindowOverlay 
            title={"Process Ticket Invoice Request"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text="Process Invoice Request"
                clickFunc={processInvoiceRequest}                
                submitting={isUpdating}
                submittingText="Processing..."
                iconFont="check_circle"
                color="dark-blue"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <p>Record invoice details to process this invoice request.</p>

            <InfoGrid>
                <GridItem title="Invoice Total">
                    <MoneyInput
                        name="invoice_value"
                        label="Invoice value"
                        value={processAttributes.invoice_value}
                        updateFunc={updateParams}
                        hasSubmitted={hasSubmitted}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title="Invoice Number">
                    <TextInput
                        name="invoice_number"
                        label="Invoice number"
                        value={processAttributes.invoice_number}
                        updateFunc={updateParams}
                        hasSubmitted={hasSubmitted}
                        maxWidth={100}
                        required
                    />
                </GridItem>
                <GridItem title="Invoice Date">
                    <DateInput
                        name="invoice_date"
                        label="Invoice date"
                        value={processAttributes.invoice_date}
                        updateFunc={updateDateParams}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ProcessTicketInvoiceRequest