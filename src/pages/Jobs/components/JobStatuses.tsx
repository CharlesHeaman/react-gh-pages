import Label from "../../../components/ui/General/Label/Label"
import { JobInvoiceRequestResponseData } from "../../../types/JobInvoiceRequest"
import { QuoteResponseData } from "../../../types/quote.types"

const JobStatuses = (props: {
    job: QuoteResponseData,
    invoiceRequest: JobInvoiceRequestResponseData | undefined,
    hideText?: boolean,
}) => {
    return (
        <div className="flex">
            {props.job.data.completion_date !== null ?
                <Label text="Complete" iconFont="check_circle" color="dark-blue" hideText={props.hideText}/> : 
                <Label text="Open" iconFont="pending" color="light-blue" hideText={props.hideText}/> 
                
            }
            {props.invoiceRequest ?
                props.invoiceRequest.data.is_processed ? 
                    <Label text="Invoice Request Processed" iconFont="credit_card" color="dark-blue" hideText={props.hideText}/> :
                    <Label text="Invoice Requested" iconFont="credit_card" color="light-blue" hideText={props.hideText}/> 
                : null
            }
        </div>
    )
}

export default JobStatuses