import BooleanLabel from "../../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Customer } from "../../../../../types/customers.types"

const CustomerTicketRequirements = (props: {
    customerData: Customer,
}) => {
    return (
        <section>
            <h2>Ticket Requirements</h2>
            <InfoGrid>
                <GridItem title='Ticket Always Require PO' span={3}>
                    <BooleanLabel true={props.customerData.tickets_always_require_purchase_order}/>
                </GridItem>
                <GridItem title='Ticket Always Require RAMS' span={3}>
                    <BooleanLabel true={props.customerData.tickets_always_require_rams}/>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerTicketRequirements