import { useEffect, useState } from "react";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../components/ui/SearchTable/SearchTable";
import { CustomerCollectionResponse, CustomerResponseData } from "../../types/customers.types";
import { RiskAssessmentMethodStatementCollectionResponse } from "../../types/riskAssessmentMethodStatements.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import findTicket from "../../utils/findTicket";
import getAPI from "../../utils/getAPI";
import RiskAssessmentMethodStatementRow from "./components/RiskAssessmentMethodStatementRow";
import RiskAssessmentMethodStatementRowSkeleton from "./RiskAssessmentMethodStatementRowSkeleton";


const RiskAssessmentMethodStatementList = (props: {
    isRAMSLoading: boolean,
    rams: RiskAssessmentMethodStatementCollectionResponse | undefined,
    perPage: number,
}) => {
    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "risk assessment method statements";
    const resourceIcon = "assignment_late";

    useEffect(() => {
        setIsTicketsLoading(true)
    }, [props.isRAMSLoading]);

    useEffect(() => {
        if (props.rams && props.rams.data.length > 0) {
            getTickets([...new Set(props.rams.data.map(rams => {
                return {
                    ticket_id: rams.data.ticket_id,
                    ticket_type: rams.data.ticket_type
                }
            }))]);
        } else {
            setIsTicketsLoading(false)
        }
    }, [props.rams]);

    const getTickets = (tickets: any) => {
        getAPI(`tickets`, {
            tickets: tickets
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data)
            if (ticketData.data.length > 0) {
                getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))])
            }
        }, setIsTicketsLoading)   
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI(`customers`, {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)   
    }

    const isLoading = (
        props.isRAMSLoading || 
        isTicketsLoading || 
        isCustomersLoading
    )


    return (
        <div>
            <SearchTable
                headers={['File Name', 'Ticket', 'Customer', 'Date']}
                isLoading={!(!isLoading && props.rams)}
                skeletonRow={<RiskAssessmentMethodStatementRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.rams ? props.rams.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.rams && props.rams.data.map((riskAssessmentMethodStatement, index) => 
                    <RiskAssessmentMethodStatementRow
                        ticket={findTicket(ticketData, riskAssessmentMethodStatement.data.ticket_id, riskAssessmentMethodStatement.data.ticket_type)}
                        customers={customerData}
                        riskAssessmentMethodStatement={riskAssessmentMethodStatement}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.rams) && <PaginationNavigation
                data={props.rams.data}
                totalCount={props.rams.total_count}
                perPage={props.rams.pages.per_page}
                resourceName={resourceName}
                prefix="rams"    
            />}
        </div>
    )
}

export default RiskAssessmentMethodStatementList