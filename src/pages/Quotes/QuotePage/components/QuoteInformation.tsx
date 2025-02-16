import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { ContactResponseData } from "../../../../types/contact.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { QuoteResponseData } from "../../../../types/quote.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { Site, SiteResponseData } from "../../../../types/sites.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import getQuoteStatusColor from "../../utils/getQuoteStatusColor"
import getQuoteStatusDescription from "../../utils/getQuoteStatusDescription"
import getQuoteStatusIcon from "../../utils/getQuoteStatusIcon"
import getQuoteStatusTitle from "../../utils/getQuoteStatusTitle"
import MaintenanceQuoteQuotedSites from "./MaintenanceQuoteQuotedSites"
import QuoteDocuments from "./QuoteDocuments"
import QuoteInformationDetails from "./QuoteInformationDetails"
import QuotePreview from "./QuotePreview"
import ServiceQuoteQuotedEquipment from "./ServiceQuoteQuotedEquipment"

const QuoteInformation = (props: {
    quote: QuoteResponseData,
    departmentData: DepartmentResponseData,
    customerData: CustomerResponseData | undefined,
    siteData: Site | undefined,
    ticket: TicketResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    equipment: Array<EquipmentResponseData>,
    quotedSites: Array<QuotedSiteResponseData>,
    sites: Array<SiteResponseData>,
    originator: UserResponseData,
    recipient: ContactResponseData | undefined,
}) => {
    return (
        <>
            <section>
                <InnerContainer
                    color={getQuoteStatusColor(props.quote.data.status)}
                >
                    <IconTitleText
                        iconFont={getQuoteStatusIcon(props.quote.data.status)}
                        color={getQuoteStatusColor(props.quote.data.status)}
                        title={`Quote ${getQuoteStatusTitle(props.quote.data.status)}`}
                        text={getQuoteStatusDescription(props.quote.data.status, props.quote.data.created_at)}
                    />
                </InnerContainer>
            </section>
            <QuoteInformationDetails
                quote={props.quote.data}
                customerData={props.customerData}
                siteData={props.siteData}
                recipientData={props.recipient}
                ticket={props.ticket}
                department={props.departmentData}
                quotedEquipment={props.quotedEquipment}
                quotedSites={props.quotedSites}
                quoteLines={props.quoteLines}
            />
            <hr/>
            {!props.quote.data.is_project ? <>
                {!props.quote.data.is_maintenance ?
                    <ServiceQuoteQuotedEquipment
                        quotedEquipment={props.quotedEquipment}
                        equipment={props.equipment}
                        quoteLines={props.quoteLines}
                    /> :
                    <MaintenanceQuoteQuotedSites
                        quotedSites={props.quotedSites}
                        sites={props.sites}
                        quoteLines={props.quoteLines}
                    />
                }
                <hr/>
            </> : null}
            {!props.quote.data.is_project ? <>
                <QuotePreview 
                    quote={props.quote} 
                    customerData={props.customerData} 
                    departmentData={props.departmentData}
                    originator={props.originator} 
                    ticket={props.ticket}
                    quoteLines={props.quoteLines}
                    recipient={props.recipient} 
                    // siteData={props.siteData} 
                    quotedEquipment={props.quotedEquipment}                
                />
                <hr/>
            </> : null}
            <QuoteDocuments
                quoteID={props.quote.id}
            />
        </>
    )
}

export default QuoteInformation