import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../../components/ui/General/Label/Label"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { ContractResponseData } from "../../../../types/contract.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { InvoiceTypeResponseData } from "../../../../types/invoiceTypes.types"
import { QuoteResponseData } from "../../../../types/quote.types"
import { SiteResponseData } from "../../../../types/sites.types"
import { TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"
import getGrossProfitMargin from "../../../../utils/getGrossProfit"
import TicketAccountsDetails from "../../../Ticket/components/TicketAccountsDetails"
import GrossProfitMarginLabel from "../../../Ticket/TicketPage/components/TicketSideBar/components/TicketActions/components/GrossProfitMarginLabel"
import getInvoiceRequestStatusColor from "../../utils/getInvoiceRequestStatusColor"
import getInvoiceRequestStatusIcon from "../../utils/getInvoiceRequestStatusIcon"
import getInvoiceRequestStatusTitle from "../../utils/getInvoiceRequestStatusTitle"
import InvoiceRequestStatusDescription from "./InvoiceRequestStatusDescription"
import TicketInvoiceRequestTicketInformation from "./TicketInvoiceRequestTicketInformation"

const TicketInvoiceRequestInformation = (props: {
    invoiceRequest: TicketInvoiceRequestResponseData,
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData,
    quote: QuoteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    contract: ContractResponseData | undefined,
    createdByUser: UserResponseData,
    processedByUser: UserResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined
}) => {

    const totalCost = (
        props.invoiceRequest.data.labour_cost + 
        props.invoiceRequest.data.mileage_cost + 
        props.invoiceRequest.data.expenses_cost + 
        props.invoiceRequest.data.material_cost + 
        props.invoiceRequest.data.sub_contract_cost + 
        props.invoiceRequest.data.hire_cost
    )

    const totalCharge = props.quote ? props.quote.data.value : (
        props.invoiceRequest.data.labour_charge + 
        props.invoiceRequest.data.mileage_charge + 
        props.invoiceRequest.data.expenses_charge + 
        props.invoiceRequest.data.material_charge + 
        props.invoiceRequest.data.sub_contract_charge + 
        props.invoiceRequest.data.hire_charge
    )

    return (
        <>
            <section>
                <InnerContainer
                    color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}
                >
                    <IconTitleText 
                        title={`Invoice Request ${getInvoiceRequestStatusTitle(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}`}
                        text={<InvoiceRequestStatusDescription
                            invoiceRequest={props.invoiceRequest}
                            createdByUser={props.createdByUser}
                            processedByUser={props.processedByUser}
                            hideLink
                    />}
                        iconFont={getInvoiceRequestStatusIcon(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}
                        color={getInvoiceRequestStatusColor(props.invoiceRequest.data.is_processed, props.invoiceRequest.data.holding_for_purchase_order_number)}
                    />
                </InnerContainer>
            </section>
            <TicketInvoiceRequestTicketInformation 
                ticket={props.ticket} 
                department={props.department} 
                customer={props.customer} 
                site={props.site} 
                equipment={props.equipment}
            />
            <hr/>
            <TicketAccountsDetails
                contract={props.contract}
                invoiceType={props.invoiceType}
                customer={props.customer}
                purchaseOrderNumber={props.ticket.data.purchase_order_number}
                isQuoted={props.ticket.data.parent_quote_id !== null}
            />
            <hr/>
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
                    <GridItem title='Invoice Address' span={3}>
                        <p>{props.customer.data.invoice_address ? props.customer.data.invoice_address : 'None'}</p>
                    </GridItem>
                    <GridItem title='Sage Name' span={3}>
                        <p>{props.customer.data.sage_name ? props.customer.data.sage_name : 'None'}</p>
                    </GridItem>
                    <GridItem title='Invoice Text'>
                        <p>{props.invoiceRequest.data.invoice_text}</p>
                    </GridItem>
                    <GridItem title='Accounts Notes'>
                        <p>
                            {props.customer.data.accounts_notes ? props.customer.data.accounts_notes : null}
                            {props.customer.data.accounts_notes && props.invoiceRequest.data.accounts_notes ? <><br/><br/></> : null}
                            {props.invoiceRequest.data.accounts_notes  ? props.invoiceRequest.data.accounts_notes  : null}
                            {!props.customer.data.accounts_notes && !props.invoiceRequest.data.accounts_notes ? 'None' : null}
                        </p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Cost/Charge Breakdown</h2>
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
                                    <tr>
                                        <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)'}}>Charge</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.labour_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.mileage_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.expenses_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.material_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.sub_contract_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right">{props.ticket.data.parent_quote_id === null ? formatMoney(props.invoiceRequest.data.hire_charge) : <Label text="N/A" color="grey"/>}</td>
                                        <td className="text-right" style={{ fontWeight: 600, fontSize: '1em' }}>{formatMoney(totalCharge)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)'}}>GP Markup</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_labour ? getGrossProfitMargin(props.invoiceRequest.data.labour_cost, props.invoiceRequest.data.labour_charge) : undefined}/> : null}</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_mileage ? getGrossProfitMargin(props.invoiceRequest.data.mileage_cost, props.invoiceRequest.data.mileage_charge) : undefined}/> : null}</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_expenses ? getGrossProfitMargin(props.invoiceRequest.data.expenses_cost, props.invoiceRequest.data.expenses_charge) : undefined}/> : null}</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_materials ? getGrossProfitMargin(props.invoiceRequest.data.material_cost, props.invoiceRequest.data.material_charge) : undefined}/> : null}</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_subcontract ? getGrossProfitMargin(props.invoiceRequest.data.sub_contract_cost, props.invoiceRequest.data.sub_contract_charge) : undefined}/> : null}</td>
                                        <td>{props.ticket.data.parent_quote_id === null && props.invoiceType ? <GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_hire ? getGrossProfitMargin(props.invoiceRequest.data.hire_cost, props.invoiceRequest.data.hire_charge) : undefined}/> : null}</td>
                                        <td><GrossProfitMarginLabel grossProfitMargin={getGrossProfitMargin(totalCost, totalCharge)}/></td>
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

export default TicketInvoiceRequestInformation