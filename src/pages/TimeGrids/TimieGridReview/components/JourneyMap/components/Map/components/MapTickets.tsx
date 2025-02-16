import { InfoWindow, Marker } from "@react-google-maps/api";
import MapTicketInfoWindow from "../../../../../../../../components/maps/infoWindows/MapTicketInfoWindow";
import { Dispatch, SetStateAction } from "react";
import { TicketResponseData } from "../../../../../../../../types/tickets.types";
import { SiteResponseData } from "../../../../../../../../types/sites.types";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";

function MapTickets(props: {
    tickets: Array<TicketResponseData>,
    siteData: Array<SiteResponseData>,
    customerData: Array<CustomerResponseData>,
    currentTicketIndex: number
    setCurrentTicketIndex: Dispatch<SetStateAction<number>>,
    resetMarkers: () => void,
    resetSelection: () => void
}) {
    const getTicketLocation = (siteID: number) => {
        const coordinates = props.siteData.find((site) => site.id === siteID)?.data.coordinates;
        return {
            lat: coordinates?.latitude,
            lng: coordinates?.longitude
        }
    }
    return (
        <>
            {props.tickets.map((ticket, index) => 
                <Marker
                    position={getTicketLocation(ticket.data.site_id)}
                    label={{
                        text: `\ue53f`,
                        fontFamily: "Material Icons",
                        color: "#ffffff",
                        fontSize: "18px",
                    }}
                    title={`${ticket.data.number}${ticket.data.suffix > 0 ? `/${ticket.data.suffix}` : ''}`}
                    onClick={() => { 
                        props.resetMarkers();
                        props.resetSelection();
                        props.setCurrentTicketIndex(index); 
                    }}
                    key={index}
                >
                    {props.currentTicketIndex === index && 
                        <InfoWindow
                            position={getTicketLocation(ticket.data.site_id)}
                            onCloseClick={() => props.setCurrentTicketIndex(-1)}
                        >
                            <MapTicketInfoWindow 
                                ticket={ticket}
                                site={props.siteData.find((site) => site.id === ticket.data.site_id)}
                                customer={props.customerData.find((customer) => customer.id === ticket.data.customer_id)}
                            />
                        </InfoWindow>
                    }
                </Marker>
            )}
        </>
    )
}

export default MapTickets