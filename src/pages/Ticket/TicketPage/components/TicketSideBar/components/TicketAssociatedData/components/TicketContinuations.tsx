import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import TicketLink from "../../../../../../../../components/ui/Links/TicketLink";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { TicketCollectionResponse } from "../../../../../../../../types/tickets.types";
import formatDate from "../../../../../../../../utils/formatDate";
import getAPI from "../../../../../../../../utils/getAPI";

const TicketContinuations = (props: {
    ticketNumber: number,
    departmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isContinuationsLoading, setIsContinuationsLoading] = useState(true);
    const [continuationData, setContinuationData] = useState<TicketCollectionResponse>();

    // Search Parameters 
    const offset = searchParams.get('refrigerant_movementsOffset');
    const paramPerPage = searchParams.get('refrigerant_movementsPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    useEffect(() => {
        getContinuations();
    }, [props.ticketNumber, props.departmentID, offset, perPage])

    const getContinuations = () => {
        getAPI('tickets', {
            department_ids: [props.departmentID],
            numbers: [props.ticketNumber],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setContinuationData(ticketData);
        }, setIsContinuationsLoading)
    }

    const isLoading = (
        isContinuationsLoading
    )

    return (
        <WindowOverlay 
            title="Continuations"
            maxWidth={400} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <div>
                <SearchTable
                    headers={['Number', 'Visit Date']}
                    isLoading={!(!isLoading && continuationData)}
                    skeletonRow={<></>}
                    skeletonCount={Math.min(perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={continuationData ? continuationData.data.length : 0}
                    resourceName={"tickets"}
                    resourceIconFont={"confirmation_number"}
                    body={continuationData && continuationData.data.map((ticket, index) => 
                        <tr key={index}>
                            <td className="text-left"><TicketLink id={ticket.id} ticketType={ticket.data.ticket_type} parentID={ticket.data.parent_ticket_id} deptID={ticket.data.department_id} number={ticket.data.number} suffix={ticket.data.suffix}/></td>
                            <td>{formatDate(ticket.data.visit_date)}</td>
                        </tr>
                    )}
                />
                {(!isContinuationsLoading && continuationData) && <PaginationNavigation
                    data={continuationData.data}
                    totalCount={continuationData.total_count}
                    perPage={continuationData.pages.per_page} 
                    resourceName={"tickets"} 
                    prefix="requisitions"            
                />}
            </div>
        </WindowOverlay>
    )
}

export default TicketContinuations