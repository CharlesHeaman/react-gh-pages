import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../utils/getAPI";
import TicketList from "../../../../../../Tickets/components/TicketList";
import TicketSearchHeader from "../../../../../../Tickets/components/TicketSearchHeader";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import getTicketSearchParams from "../../../../../../DepartmentTickets/components/getTicketSearchParams";
import { useSearchParams } from "react-router-dom";

const JobTicketsList = (props: {
    departmentName: string,
    job: QuoteResponseData,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();

    // Search Parameters
    const ticketSearchParams = getTicketSearchParams(searchParams);    
    
    useEffect(() => {
        getTickets();
    }, [JSON.stringify(ticketSearchParams), props.job.data.number]);

    const getTickets = () => {
        getAPI(`tickets`, {
            ...ticketSearchParams,
            job_number: props.job.data.number
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Job Tickets'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1400}
                top
            >
                <TicketSearchHeader 
                    departmentName={props.departmentName}                
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                    jobID={props.job.id}
                />
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default JobTicketsList