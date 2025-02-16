import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { TicketCollectionResponse } from "../../types/tickets.types";
import getAPI from "../../utils/getAPI";
import TicketList from "../Tickets/components/TicketList";
import TicketListFilter from "../Tickets/components/TicketListFilter";
import TicketSearchHeader from "../Tickets/components/TicketSearchHeader";
import getTicketSearchParams from "./components/getTicketSearchParams";

const TicketListPage = ()  => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();

    // Search Parameters
    const ticketSearchParams = getTicketSearchParams(searchParams);
    const listType = searchParams.get('ticket_list_type');

    useEffect(() => {
        if (departmentData === undefined) return;
        searchTickets();
    }, [departmentData?.id, JSON.stringify(ticketSearchParams), listType])

    const queryParams = [
        {
            is_unassigned: true,
            has_completion_date: false,
        },
        {
            is_further_work_required: true,
            has_completion_date: false,
        },
        {
            is_parts_received: false,
            is_parts_required: true,
            has_completion_date: false,

        },
        {
            is_rams_required: true,
            is_rams_uploaded: false,
            has_completion_date: false,
        }
    ]

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }
    
    const searchTickets = () => {
        const listQueryParams = listType ? queryParams[parseInt(listType)] : {};
        getAPI('tickets', {
            ...ticketSearchParams,
            ...listQueryParams,
            department_ids: [departmentData?.id]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)
    }
    
    return (
        <>
            <OuterContainer
                title='Tickets'
                maxWidth={1800}
                description="View and edit tickets. Update ticket assignment. Process engineer reports."
                noBorder
            >
                <TicketSearchHeader
                    departmentName={departmentName as string}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </OuterContainer>
        </>
    )
}

export default TicketListPage