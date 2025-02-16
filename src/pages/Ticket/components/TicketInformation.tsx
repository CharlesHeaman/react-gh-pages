import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import TicketLink from "../../../components/ui/Links/TicketLink"
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types"
import { ContactResponseData } from "../../../types/contact.types"
import { ContractResponseData } from "../../../types/contract.types"
import { CreditNoteResponseData } from "../../../types/creditNote.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { EquipmentResponseData } from "../../../types/equipment.types"
import { InterimInvoiceResponseData } from "../../../types/interimInvoice.types"
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import formatMoney from "../../../utils/formatMoney"
import InterimInvoices from "../../Jobs/components/InterimInvoices"
import NewQuoteLink from "../../Quotes/components/NewQuoteLink"
import TicketStatuses from "../TicketPage/components/TicketStatuses"
import CreditNotes from "./CreditNotes"
import EngineerTicketStatus from "./EngineerTicketStatus"
import TicketAccountsDetails from "./TicketAccountsDetails"
import TicketAssignmentDetails from "./TicketAssignmentDetails"
import TicketContactDetails from "./TicketContactDetails"
import TicketCustomerDetails from "./TicketCustomerDetails"
import TicketDetailsInformation from "./TicketDetailsInformation"
import TicketDocuments from "./TicketDocuments"
import TicketInvoiceRequestDetails from "./TicketInvoiceRequestDetails"
import TicketJobInformation from "./TicketJobInformation"

const TicketInformation = (props: {
    ticket: TicketResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    contract: ContractResponseData | undefined,
    contact: ContactResponseData | undefined,
    quote: QuoteResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined,
    department: DepartmentResponseData,
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
    invoiceCreatedByUser: UserResponseData | undefined,
    invoiceProcessedByUser: UserResponseData | undefined,
    engineers: Array<UserResponseData>,
    continuations: Array<TicketResponseData>,
    interimInvoices: Array<InterimInvoiceResponseData>,
    creditNotes: Array<CreditNoteResponseData>
    job: QuoteResponseData | undefined,
    jobDepartment: DepartmentResponseData | undefined,
}) => {
    return (
        <>
            {props.ticket.data.is_abandoned ? 
                <section>
                    <InnerContainer 
                        color="red"
                    > 
                        <IconTitleText
                            title='Ticket Abandoned'
                            iconFont="delete"
                            color="red"
                            text="This ticket was marked as abandoned on [date]."
                        />
                    </InnerContainer>
                </section> : null
            }
            {props.ticket.data.is_rams_required && !props.ticket.data.is_rams_uploaded ?
                <section>
                    <InnerContainer 
                        color="red"
                    > 
                        <IconTitleText
                            title='RAMS Outstanding'
                            iconFont="assignment_late"
                            color="red"
                            text="RAMS is required for this ticket and is still outstanding."
                        />
                    </InnerContainer>
                </section> : null
            }
            {props.ticket.data.is_parts_required && !props.ticket.data.is_parts_received ?
                <section>
                    <InnerContainer 
                        color="red"
                    > 
                        <IconTitleText
                            title='Parts Outstanding'
                            iconFont="inventory_2"
                            color="red"
                            text="Parts are required for this ticket and some parts are still outstanding."
                        />
                    </InnerContainer>
                </section> : null
            }
            {props.invoiceRequest && props.invoiceCreatedByUser ? <>
                <TicketInvoiceRequestDetails
                    invoiceRequest={props.invoiceRequest} 
                    invoiceProcessedByUser={props.invoiceProcessedByUser} 
                    invoiceCreatedByUser={props.invoiceCreatedByUser} 
                />
                <hr/>
            </> : null}
            {props.creditNotes.length > 0 ? <>
                <CreditNotes
                    creditNotes={props.creditNotes}
                    />
                <hr/>
            </> : null}
            <TicketCustomerDetails 
                isPlannedMaintenance={props.ticket.data.ticket_type === 1}
                customer={props.customer} 
                site={props.site} 
                equipment={props.equipment}
            />
            <hr/>
            <TicketDetailsInformation
                ticketData={props.ticket.data}
                customer={props.customer} 
                site={props.site}
            />
            {props.department.data.uses_collection_module ? <>
                <hr/>
                <section>
                    <h2>Instruction Details</h2>
                    <InfoGrid>
                        <GridItem title='Reference' span={2}>
                            <p>{props.ticket.data.reference}</p>
                        </GridItem>
                        <GridItem title='Drawing Provided' span={2}>
                            <BooleanLabel true/>
                        </GridItem>
                        <GridItem title='Instruction Type' span={2}>

                        </GridItem>
                    </InfoGrid>
                </section>
            </> :  null}
            {props.contact ? <>
                <hr/>
                <TicketContactDetails
                    contact={props.contact}
                />
            </> : null}
            {props.quote ? <>
                <hr/>
                <section>
                    <h2>Quote Details</h2>
                    <InfoGrid>
                        <GridItem title='Quote' span={2}>
                            <NewQuoteLink 
                                departmentName={props.department.data.name}
                                number={props.quote.data.number} 
                                suffix={props.quote.data.revision_number}                            
                            />
                        </GridItem>
                        <GridItem title='Quote Value' span={4}>
                            <p>{formatMoney(props.quote.data.value)}</p>
                        </GridItem>
                    </InfoGrid>
                </section>
            </> : null}
            {props.job && props.jobDepartment ? <>
                <hr/>
                <TicketJobInformation
                    job={props.job}
                    jobDepartment={props.jobDepartment}
                />
            </> : null}
            <hr/>
            <TicketAssignmentDetails 
                visitDate={props.ticket.data.visit_date} 
                engineers={props.ticket.data.engineers} 
                users={props.engineers}            
            />
            {props.ticket.data.visit_date && props.ticket.data.engineers.length > 0 ? <>
                <hr/>
                <EngineerTicketStatus
                    ticket={props.ticket}
                />
            </> : null}
            <hr/>
            {props.ticket.data.completion_date !== null ? <>
                <section>
                    <h2>Report</h2>
                    <InfoGrid>
                        <GridItem>
                            <InnerContainer color='dark-blue'>
                                <IconTitleText
                                    iconFont="check_circle"
                                    title='Ticket Complete'
                                    text={`This ticket was marked as complete on ${formatDate(props.ticket.data.completion_date)}`}
                                    color="dark-blue"
                                />
                            </InnerContainer>
                        </GridItem>
                        <GridItem title='Report'>
                            <p>{props.ticket.data.customer_viewable_report}</p>
                        </GridItem>
                        <GridItem title='Further Work Required'>
                            <BooleanLabel true={props.ticket.data.is_further_work_required ? props.ticket.data.is_further_work_required : false}/>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
            </> : null}
            {props.continuations.length > 1 ? <>
                <section>
                    <h2>{props.ticket.data.ticket_type === 0 ? 'Continuations' : 'Sub-tickets'}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Job Description</th>
                                <th>Visit Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.continuations.map((continuation, index) => continuation.data.suffix !== props.ticket.data.suffix ? <tr key={index}>
                                <td><TicketLink 
                                    departmentName={props.department.data.name} 
                                    ticket={continuation}
                                /></td>
                                <td className="text-left">
                                    <div
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            display: 'block',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '400px'
                                        }}
                                    >
                                        {continuation.data.job_description}
                                    </div>
                                </td>
                                <td>{continuation.data.visit_date ? formatDate(continuation.data.visit_date) : 'Unknown'}</td>
                                <td><TicketStatuses ticket={continuation} hideText hideType invoiceRequest={undefined} /></td>
                            </tr> : null
                            )}
                        </tbody>
                    </table>
                </section>
                <hr/>
            </> : null}
            <TicketAccountsDetails 
                contract={props.contract} 
                invoiceType={props.invoiceType} 
                customer={props.customer} 
                purchaseOrderNumber={props.ticket.data.purchase_order_number} 
                isQuoted={props.ticket.data.parent_quote_id !== null}
            />
            {props.interimInvoices.length > 0 ? <>
                <hr/>
                <InterimInvoices
                    interimInvoices={props.interimInvoices}
                />
            </> : null}
            <hr/>
            <TicketDocuments
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type}
                continuations={props.continuations}
            />
        </>
    )
}

export default TicketInformation