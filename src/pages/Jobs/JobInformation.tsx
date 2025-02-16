import GridItem from "../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../components/ui/Links/NewCustomerLink"
import { CustomerResponseData } from "../../types/customers.types"
import { DepartmentResponseData } from "../../types/department.types"
import { InterimInvoiceResponseData } from "../../types/interimInvoice.types"
import { JobInvoiceRequestResponseData } from "../../types/JobInvoiceRequest"
import { QuoteResponseData } from "../../types/quote.types"
import { UserResponseData } from "../../types/user.types"
import formatMoney from "../../utils/formatMoney"
import NewQuoteLink from "../Quotes/components/NewQuoteLink"
import QuoteDocuments from "../Quotes/QuotePage/components/QuoteDocuments"
import QuoteDocumentsList from "../Quotes/QuotePage/components/QuoteDocumentsList"
import InterimInvoices from "./components/InterimInvoices"
import JobInvoiceRequestDetails from "./components/JobInvoiceRequestDetails"

const JobInformation = (props: {
    job: QuoteResponseData,
    departmentData: DepartmentResponseData,
    customerData: CustomerResponseData | undefined,
    interimInvoices: Array<InterimInvoiceResponseData>,
    invoiceRequest: JobInvoiceRequestResponseData | undefined,
    invoiceCreatedByUser: UserResponseData | undefined,
    invoiceProcessedByUser: UserResponseData | undefined,
}) => {
    return (
        <>
            {props.invoiceRequest && props.invoiceCreatedByUser ? <>
                <JobInvoiceRequestDetails
                    invoiceRequest={props.invoiceRequest} 
                    invoiceProcessedByUser={props.invoiceProcessedByUser} 
                    invoiceCreatedByUser={props.invoiceCreatedByUser} 
                />
                <hr/>
            </> : null}
            {/* {props.job.data.completion_date ? <section>
                <InnerContainer
                    color="dark-blue"
                >
                    <IconTitleText
                        iconFont="check_circle"
                        color="dark-blue"
                        title={`Job Completed`}
                        text={`Job marked as complete on ${formatDate(props.job.data.completion_date)}.`}
                    />
                </InnerContainer>
            </section> : null} */}
            <section>
                <h2>Job Details</h2>
                <InfoGrid>
                    <GridItem title='Value'>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(props.job.data.value)}</span></p>
                    </GridItem>
                    <GridItem title='Quote'>
                        <p><NewQuoteLink departmentName={props.departmentData.data.name} number={props.job.data.number} suffix={0}/></p>
                    </GridItem>
                    <GridItem title='Customer'>
                        <p>{props.customerData ? <NewCustomerLink code={props.customerData.data.code} name={props.customerData.data.name}/> : 'Unknown'}</p>
                    </GridItem>
                    <GridItem title='Job Description'>
                        <p>{props.job.data.description}</p>
                    </GridItem>
                    <GridItem title='Notes'>
                        <p>{props.job.data.notes ? props.job.data.notes : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <InterimInvoices
                interimInvoices={props.interimInvoices}
            />
            <hr/>
            <QuoteDocuments
                quoteID={props.job.id}
            />
        </>
    )
}

export default JobInformation