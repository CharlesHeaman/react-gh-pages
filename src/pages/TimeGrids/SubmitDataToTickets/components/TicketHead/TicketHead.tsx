import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CustomerResponseData } from "../../../../../types/customers.types"
import { EquipmentResponseData } from "../../../../../types/equipment.types"
import { TicketResponseData } from "../../../../../types/tickets.types"

const TicketHead = (props: {
    ticket: TicketResponseData,
    customer: CustomerResponseData | undefined,
    equipment: EquipmentResponseData | undefined
}) => {
    return (
        <InfoGrid>
            {props.customer && <GridItem title="Customer" span={4}>
                <p>{props.customer.data.name}</p>
            </GridItem>}
            {props.equipment && <GridItem title='Equipment' span={2}>
                <p>{props.equipment.data.code}</p>
            </GridItem>}
            <GridItem title="Job Description">
                <p>{props.ticket.data.job_description}</p>
            </GridItem>
        </InfoGrid>
    )
}

export default TicketHead