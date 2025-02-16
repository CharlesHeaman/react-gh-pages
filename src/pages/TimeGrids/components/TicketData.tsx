import Requisition from "../../../components/requisitions/Requisition"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../components/ui/General/Label/Label"
import getInvoiceTypeLabel from "../../../utils/getInvoiceTypeLabel"
import TicketStatus from "../../Tickets/components/TicketStatus/TicketStatus"

function TicketData(props) {
    return (
        <InnerContainer title='Ticket Data' collapsible startCollapsed={props.startCollapsed}>
            <InfoGrid>
                {/* Status */}
                <GridItem title='Status' span='2'>
                    <TicketStatus
                        isComplete={props.ticket.engineer.isComplete} 
                        isJobComplete={props.ticket.engineer.isJobComplete} 
                        isLocked={props.ticket.engineer.isLocked} 
                        isStarted={props.ticket.engineer.isStarted} 
                        isUnableToCarryOut={props.ticket.engineer.isUnableToCarryOut} 
                        hideIcon
                    />
                </GridItem>
                {/* Ticket Type */}
                <GridItem title='Ticket Type' span={2}>
                    {props.ticket.ticketType == 0 ?
                        <Label text='Service' color='dark-blue'/> :
                        <Label text='Maintenance' color='light-green'/>
                    }
                </GridItem>
                {/* Invoice Type */}
                <GridItem title='Invoice Type' span={2}>
                    {getInvoiceTypeLabel(props.ticket.invType, props.ticket.ticketType)}
                </GridItem>
                {/* Customer */}
                <GridItem title='Customer' span={3}>
                    <p>{props.ticket.customer.fullName}</p>
                </GridItem>
                {/* Equipment */}
                {props.ticket.equipment && props.ticket.equipment.id >= 0 ? <GridItem title='Equipment' span='3'>
                    {props.ticket.equipment.id > 0 ?
                        <p>{props.ticket.equipment.code}</p> :
                        <p>Unknown</p>
                    }
                </GridItem> : null}
                {/* Job Description */}
                <GridItem title='Job Description'>
                    <p>{props.ticket.desc}</p>
                </GridItem>
                {/* Engineer Report */}
                <GridItem title='Engineer Data Report'>
                    {props.ticket.engineer.report ? 
                        <p>{props.ticket.engineer.report}</p> :
                        <p className='text-center'><b>No report found</b></p>
                    }
                </GridItem>
                {/* Materials Used */}
                <GridItem title='Materials Used'>
                    {props.ticket.engineer.materials ? 
                        <p>{props.ticket.engineer.materials}</p> :
                        <p className='text-center'><b>No materials found</b></p>
                    }
                </GridItem>
                {/* Requisitions */}
                {props.reqData.filter((req) => req.ticket.number === props.ticket.number && req.ticket.deptID === props.ticket.deptID).length > 0 && 
                    <GridItem>
                        <InnerContainer title='Requisitions' collapsible startCollapsed>
                            {props.reqData.filter((req) => req.ticket.number === props.ticket.number && req.ticket.deptID === props.ticket.deptID).map((req, index) =>
                                <Requisition
                                    req={req}
                                    key={index}
                                />
                            )}
                        </InnerContainer>
                    </GridItem>
                }
            </InfoGrid>
        </InnerContainer>
    )
}

export default TicketData