import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { JobInvoiceRequestResponseData } from "../../../../types/JobInvoiceRequest"
import { QuoteResponseData } from "../../../../types/quote.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"
import getGrossProfitMargin from "../../../../utils/getGrossProfit"
import CustomerAccountStatusLabel from "../../../CustomerAdmin/Customers/components/CustomerAccountStatusLabel"
import GrossProfitMarginLabel from "../../../Ticket/TicketPage/components/TicketSideBar/components/TicketActions/components/GrossProfitMarginLabel"
import InvoiceRequestStatusDescription from "../../TicketInvoiceRequestPage/components/InvoiceRequestStatusDescription"
import getInvoiceRequestStatusColor from "../../utils/getInvoiceRequestStatusColor"
import getInvoiceRequestStatusIcon from "../../utils/getInvoiceRequestStatusIcon"
import getInvoiceRequestStatusTitle from "../../utils/getInvoiceRequestStatusTitle"
import JobInvoiceRequestJobInformation from "./JobInvoiceRequestJobInformation"

const JobInvoiceRequestInformation = (props: {
    invoiceRequest: JobInvoiceRequestResponseData,
    job: QuoteResponseData,
    customer: CustomerResponseData | undefined,
    createdByUser: UserResponseData,
    department: DepartmentResponseData,
    processedByUser: UserResponseData | undefined,
}) => {

    const totalCost = (
        props.invoiceRequest.data.labour_cost + 
        props.invoiceRequest.data.mileage_cost + 
        props.invoiceRequest.data.expenses_cost + 
        props.invoiceRequest.data.material_cost + 
        props.invoiceRequest.data.sub_contract_cost + 
        props.invoiceRequest.data.hire_cost
    )

    return (
        <>
            <section>
                <InnerContainer
                    color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, false)}
                >
                    <IconTitleText 
                        title={`Invoice Request ${getInvoiceRequestStatusTitle(props.invoiceRequest.data.is_processed, false)}`}
                        text={<InvoiceRequestStatusDescription
                            invoiceRequest={props.invoiceRequest}
                            createdByUser={props.createdByUser}
                            processedByUser={props.processedByUser}
                            isJob
                            hideLink
                        />}
                        iconFont={getInvoiceRequestStatusIcon(props.invoiceRequest.data.is_processed, false)}
                        color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, false)}
                    />
                </InnerContainer>
            </section>
            <JobInvoiceRequestJobInformation
                job={props.job}
                department={props.department}
                customer={props.customer}
            />
            <hr/>
            {props.customer ? <>
                <section>
                    <h2>Accounts Information</h2>
                    <InfoGrid>
                        <GridItem title='Accounts Status' span={3}>
                            <CustomerAccountStatusLabel accountsStatus={props.customer.data.accounts_status}/>
                        </GridItem>
                        <GridItem title='Sage Name' span={2}>
                            <p>{props.customer.data.sage_name ? props.customer.data.sage_name : 'None'}</p>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
            </> : null}
            {props.invoiceRequest.data.is_processed ? <>
                <section>
                    <h2>Invoice Details</h2>
                    <InfoGrid>
                        <GridItem title='Invoice Number' span={2}>
                            <p>{props.invoiceRequest.data.invoice_number}</p>
                        </GridItem>
                        <GridItem title='Invoice Date' span={2}>
                            <p>{formatDate(props.invoiceRequest.data.invoice_date)}</p>
                        </GridItem>
                        <GridItem title='Invoice Value' span={2}>
                            <p>{formatMoney(props.invoiceRequest.data.invoice_value)}</p>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
            </> : null}
            <section>
                <h2>Invoice Request Details</h2>
                <InfoGrid>
                    <GridItem title='Requested Amount' span={2}>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(props.invoiceRequest.data.requested_value)}</span></p>
                    </GridItem>
                    <GridItem title='Total Cost' span={2}>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(totalCost)}</span></p>
                    </GridItem>
                    <GridItem title='GP Markup' span={2}>
                        <GrossProfitMarginLabel grossProfitMargin={getGrossProfitMargin(totalCost, props.invoiceRequest.data.requested_value)}/>
                    </GridItem>
                    {props.customer ? <>
                        <GridItem title='Invoice Address' span={3}>
                            <p>{props.customer.data.invoice_address ? props.customer.data.invoice_address : 'None'}</p>
                        </GridItem>
                        <GridItem title='Sage Name' span={3}>
                            <p>{props.customer.data.sage_name ? props.customer.data.sage_name : 'None'}</p>
                        </GridItem>
                    </> : null}
                    <GridItem title='Invoice Text'>
                        <p>{props.invoiceRequest.data.invoice_text}</p>
                    </GridItem>
                    {/* <GridItem title='Accounts Notes'>
                        <p>
                            {props.customer.data.accounts_notes ? props.customer.data.accounts_notes : null}
                            {props.customer.data.accounts_notes && props.invoiceRequest.data.accounts_notes ? <><br/><br/></> : null}
                            {props.invoiceRequest.data.accounts_notes  ? props.invoiceRequest.data.accounts_notes  : null}
                            {!props.customer.data.accounts_notes && !props.invoiceRequest.data.accounts_notes ? 'None' : null}
                        </p>
                    </GridItem> */}
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Cost Breakdown</h2>
                <InfoGrid>
                    <GridItem>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Labour</th>
                                        <th>Mileage</th>
                                        <th>Expenses</th>
                                        <th>Materials</th>
                                        <th>Subcontract</th>
                                        <th>Hire</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)'}}>Cost</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.labour_cost)}</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.mileage_cost)}</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.expenses_cost)}</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.material_cost)}</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.sub_contract_cost)}</td>
                                        <td className="text-right">{formatMoney(props.invoiceRequest.data.hire_cost)}</td>
                                        <td className="text-right" style={{ fontWeight: 600, fontSize: '1em' }}>{formatMoney(totalCost)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default JobInvoiceRequestInformation