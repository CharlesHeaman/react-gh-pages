import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { TicketResponseData } from "../../../../../../../types/tickets.types"
import TicketEquipmentDetails from "./components/TicketEquipmentDetails"
import TicketNotes from "./components/TicketNotes"
import TicketReports from "./components/TicketReports"
import TicketVanStockRequests from "./components/TicketVanStockRequests"

const TicketEngineer = (props: {
    tickets: Array<any>,
    continuations: Array<TicketResponseData>,
    invoiceTimeCount: number
    reportsCount: number,
    equipmentDetailsCount: number,
    notesCount: number,
    vanStockRequestsCount: number,
    siteListNotesCount: number,
    departmentName: string,
    ticketType: number,
}) => {
    const navigate = useNavigate();
    
    const [showEquipmentDetails, setShowEquipmentDetails] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showVanStockRequests, setShowVanStockRequests] = useState(false);

    return (
        <>
            <SideBarModule title="Engineer">
                {props.ticketType > 0 ? <SideBarButton  
                    text={`Site List Notes (${props.siteListNotesCount})`}
                    iconFont="checklist"
                    clickEvent={() => navigate('site_list_notes')}
                /> : null}
                <SideBarButton  
                    text={`Reports (${props.reportsCount})`}
                    iconFont="summarize"
                    clickEvent={() => setShowReports(true)}
                />
                <SideBarButton  
                    text={`Equipment Details (${props.equipmentDetailsCount})`}
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowEquipmentDetails(true)}
                />
                <SideBarButton  
                    text={`Notes (${props.notesCount})`}
                    iconFont="speaker_notes"
                    clickEvent={() => setShowNotes(true)}
                />
                <SideBarButton
                    text={`Van Replenishment Requests (${props.vanStockRequestsCount})`}
                    iconFont="minor_crash"
                    clickEvent={() => setShowVanStockRequests(true)}
                />
                <SideBarButton
                    text={`Post-completion Change Requests ()`}
                    iconFont="restart_alt"
                    clickEvent={() => setShowVanStockRequests(true)}
                
                />
            </SideBarModule>

            <TicketReports 
                tickets={props.tickets}
                totalCount={props.reportsCount} 
                departmentName={props.departmentName}
                show={showReports} 
                hideFunc={() => setShowReports(false)}
            />

            <TicketEquipmentDetails 
                tickets={props.tickets}
                departmentName={props.departmentName}
                totalCount={props.equipmentDetailsCount} 
                show={showEquipmentDetails} 
                hideFunc={() => setShowEquipmentDetails(false)}
            />

            <TicketNotes 
                tickets={props.tickets}
                totalCount={props.notesCount} 
                show={showNotes} 
                hideFunc={() => setShowNotes(false)}
            />

            <TicketVanStockRequests
                tickets={props.tickets}
                totalCount={props.vanStockRequestsCount} 
                show={showVanStockRequests} 
                hideFunc={() => setShowVanStockRequests(false)}
            />
        </>
    )
}

export default TicketEngineer