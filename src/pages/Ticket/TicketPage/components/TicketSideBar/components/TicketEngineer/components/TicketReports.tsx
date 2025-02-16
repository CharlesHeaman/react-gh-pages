import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Label from "../../../../../../../../components/ui/General/Label/Label";
import TicketLink from "../../../../../../../../components/ui/Links/TicketLink";
import { TicketCollectionResponse } from "../../../../../../../../types/tickets.types";
import formatDate from "../../../../../../../../utils/formatDate";
import getAPI from "../../../../../../../../utils/getAPI";

const TicketReports = (props: {
    tickets: Array<any>,
    totalCount: number,
    show: boolean,
    departmentName: string,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // // Data States
    const [isContinuationsLoading, setIsContinuationsLoading] = useState(true);
    const [continuationData, setContinuationData] = useState<TicketCollectionResponse>();

    // Search Parameters 
    
    useEffect(() => {
        getReports();
    }, [props.tickets])

    const getReports = () => {
        getAPI('tickets', {
            tickets: props.tickets,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setContinuationData(ticketData);
        }, setIsContinuationsLoading)
    } 

    return (
        <WindowOverlay 
            title={"Ticket Engineer Reports"} 
            maxWidth={1400} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Ticket</th>
                        <th>Visit Date</th>
                        <th>Report</th>
                        <th>Materials Used</th>
                    </tr>
                </thead>
                <tbody>
                    {continuationData ? continuationData.data.map((ticket, index) =>
                        <tr key={index}>
                            <td>{ticket.data.is_report_complete ?
                                ticket.data.is_engineer_data_processed ?
                                    <Label text="Processed" color="purple" iconFont="check_circle"/> :
                                    <Label text="Complete" color="dark-blue" iconFont="check_circle"/> 
                                :
                                <Label text="Incomplete" color="red" iconFont="pending"/>
                            }</td>
                            <td className="text-left"><TicketLink 
                                ticket={ticket}
                                departmentName={props.departmentName} 
                            /></td>
                            <td>{ticket.data.visit_date ? formatDate(ticket.data.visit_date) : 'Unknown'}</td>
                            <td className="text-left">{ticket.data.engineer_report}</td>
                            <td className="text-left">{ticket.data.engineer_materials}</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </WindowOverlay>
    )
}

export default TicketReports