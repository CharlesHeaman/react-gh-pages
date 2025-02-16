import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import ContactLink from "../../../../components/ui/Links/ContactLink"
import JobLink from "../../../../components/ui/Links/JobLink"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import { ContactResponseData } from "../../../../types/contact.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { Quote } from "../../../../types/quote.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { Site } from "../../../../types/sites.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import formatHours from "../../../../utils/formatHours"
import formatMoney from "../../../../utils/formatMoney"
import getIsQuoteLocked from "../../utils/getIsQuoteLocked"
import getMaintenanceQuoteTotalValue from "../utils/getMaintenanceQuoteTotalValue"
import getServiceQuoteTotalHours from "../utils/getServiceQuoteTotalHours"
import getServiceQuoteTotalTravelHours from "../utils/getServiceQuoteTotalTravelHours"
import getServiceQuoteTotalValue from "../utils/getServiceQuoteTotalValue"

const QuoteInformationDetails = (props: {
    quote: Quote,
    department: DepartmentResponseData,
    customerData: CustomerResponseData | undefined,
    siteData: Site | undefined,
    recipientData: ContactResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
    ticket: TicketResponseData | undefined,
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    quotedSites: Array<QuotedSiteResponseData>,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Quote Details</h2>
            <InfoGrid>
                {!props.isPreview ? <GridItem title='Value' span={props.quote.is_project ? 6 : 2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{getIsQuoteLocked(props.quote.status) ?
                        formatMoney(props.quote.value) :
                        formatMoney(!props.quote.is_maintenance ? 
                            getServiceQuoteTotalValue(props.quotedEquipment, props.quoteLines) :
                            getMaintenanceQuoteTotalValue(props.quotedSites, props.quoteLines)
                        )
                    }</span></p>
                </GridItem> : null}
                {!props.isPreview && !props.quote.is_project ? <GridItem title='Labour' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatHours(getServiceQuoteTotalHours(props.quotedEquipment))} hrs</span></p>
                </GridItem> : null}
                {!props.isPreview && !props.quote.is_project ? <GridItem title='Travel' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatHours(getServiceQuoteTotalTravelHours(props.quotedEquipment))} hrs</span></p>
                </GridItem> : null}
                {!props.isPreview && props.quote.is_project && (props.quote.status === 1 || props.quote.status === 5) ? <GridItem title='Job'>
                    <p><JobLink departmentName={props.department.data.name} number={props.quote.number}/></p>
                </GridItem> : null}
                <GridItem title='Customer' span={props.siteData ? 3 : 6}>
                    <p>{props.customerData ? <NewCustomerLink code={props.customerData.data.code} name={props.customerData.data.name}/> : 'Unknown'}</p>
                </GridItem>
                {props.siteData ? <GridItem title='Site' span={3}>
                    <p><SiteLink code={props.siteData.code} name={props.siteData.name}/></p>
                </GridItem> : null}
                {props.ticket ? <GridItem title='Parent Ticket' span={3}>
                    <TicketLink 
                        ticket={props.ticket}
                        departmentName={props.department.data.name} 
                    />
                </GridItem> : null}
                <GridItem title='Recipient'>
                    <p>{props.recipientData ? <ContactLink contactID={props.recipientData.id} name={props.recipientData.data.name}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Quote Description'>
                    <p>{props.quote.description}</p>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.quote.notes ? props.quote.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default QuoteInformationDetails