import Label from "../../ui/General/Label/Label";
import getInvoiceTypeLabel from "../../../utils/getInvoiceTypeLabel";
import TicketStatus from "../../../pages/Tickets/components/TicketStatus/TicketStatus";
import TicketLink from "../../ui/Links/TicketLink";
import InfoWindowContainer from "./InfoWindowContainer/InfoWindowContainer";
import DataIconPair from "./InfoWindowContainer/components/DataIconPair/DataIconPair";
import { TicketResponseData } from "../../../types/tickets.types";
import { SiteResponseData } from "../../../types/sites.types";
import { CustomerResponseData } from "../../../types/customers.types";

const MapTicketInfoWindow = (props: {
    ticket: TicketResponseData,
    site?: SiteResponseData,
    customer?: CustomerResponseData
}) => {
    return (
        <InfoWindowContainer
            headerContent={
                <>
                    <h2>
                        <TicketLink
                            ticket={props.ticket}
                        />
                    </h2>
                    <TicketStatus
                        isComplete={props.ticket.data.is_report_complete} 
                        isJobComplete={props.ticket.data.is_job_complete}
                        isLocked={props.ticket.data.visit_date > new Date()}
                        isStarted={props.ticket.data.is_started} 
                        isUnableToCarryOut={props.ticket.data.is_unable_to_attend} 
                        hideIcon
                    />
                    {props.ticket.data.ticket_type === 0 ?
                        <Label text='Service' color='dark-blue'/> :
                        <Label text='Maintenance' color='light-green'/>
                    }
                    {getInvoiceTypeLabel(props.ticket.data.invoice_type, props.ticket.data.invoice_type)}
                </>
            }
            bodyContent={
                <>
                    {props.customer && <DataIconPair
                        data={<p>{props.customer.data.name}</p>}
                        icon={<span className="material-icons">people_alt</span>}
                    />}
                    {props.site && <DataIconPair
                        data={<p>{props.site.data.name}</p>}
                        icon={<span className="material-icons">business</span>}
                    />}
                    <DataIconPair
                        data={<p>{props.ticket.data.job_description}</p>}
                        icon={<span className="material-icons">assignment</span>}
                    />
                </>
            }
        />
    )
}

export default MapTicketInfoWindow