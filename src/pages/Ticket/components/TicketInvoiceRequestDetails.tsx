import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types"
import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import formatMoney from "../../../utils/formatMoney"
import InvoiceRequestStatusDescription from "../../InvoiceRequests/TicketInvoiceRequestPage/components/InvoiceRequestStatusDescription"
import getInvoiceRequestStatusColor from "../../InvoiceRequests/utils/getInvoiceRequestStatusColor"
import getInvoiceRequestStatusTitle from "../../InvoiceRequests/utils/getInvoiceRequestStatusTitle"

const TicketInvoiceRequestDetails = (props: {
    invoiceRequest: TicketInvoiceRequestResponseData,
    invoiceCreatedByUser: UserResponseData,
    invoiceProcessedByUser: UserResponseData | undefined,
}) => {
    return (
        <section>
            <h2>Invoice Information</h2>
            <InfoGrid>
                <GridItem>          
                    <InnerContainer
                        color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}
                    >
                        <IconTitleText 
                            title={`Invoice Request ${getInvoiceRequestStatusTitle(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}`}
                            text={<InvoiceRequestStatusDescription
                                invoiceRequest={props.invoiceRequest}
                                createdByUser={props.invoiceCreatedByUser}
                                processedByUser={props.invoiceProcessedByUser}
                            />}
                            iconFont='credit_card'
                            color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}
                        />
                    </InnerContainer>             
                </GridItem> 
                {props.invoiceRequest.data.is_processed ? <>
                    <GridItem title='Invoice Number' span={2}>
                        <p>{props.invoiceRequest.data.invoice_number}</p>
                    </GridItem>
                    <GridItem title='Invoice Date' span={2}>
                        <p>{formatDate(props.invoiceRequest.data.invoice_date)}</p>
                    </GridItem>
                    <GridItem title='Invoice Value' span={2}>
                        <p>{formatMoney(props.invoiceRequest.data.invoice_value)}</p>
                    </GridItem>
                </> : null}
            </InfoGrid>
        </section>
    )
}

export default TicketInvoiceRequestDetails