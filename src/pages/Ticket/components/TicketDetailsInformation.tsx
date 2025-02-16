import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CustomerResponseData } from "../../../types/customers.types"
import { SiteResponseData } from "../../../types/sites.types"
import { Ticket } from "../../../types/tickets.types"
import formatHours from "../../../utils/formatHours"

const TicketDetailsInformation = (props: {
    ticketData: Ticket,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
}) => {
    const customerSpecialInstructions = props.customer.data.special_instructions;
    const siteSpecialInstructions = props.site ? props.site.data.special_instructions : '';

    return (
        <section>
            <h2>Ticket Details</h2>
            <InfoGrid>
                <GridItem title='Job Description'>
                    <p>{props.ticketData.job_description}</p>
                </GridItem>
                <GridItem title='Estimated Time' span={2}>
                    <p>{formatHours(props.ticketData.estimated_time)} hrs</p>
                </GridItem>
                <GridItem title='Mate Required' span={2}>
                    <BooleanLabel true={props.ticketData.is_mate_required}/>
                </GridItem>
                <GridItem title='RAMS Required' span={2}>
                    <BooleanLabel true={props.ticketData.is_rams_required}/>
                </GridItem>
                <GridItem title='Special Instructions'>
                    <p>{customerSpecialInstructions || siteSpecialInstructions ? 
                        `${customerSpecialInstructions}${customerSpecialInstructions && siteSpecialInstructions ? '\n\n' : ''}${siteSpecialInstructions}` :
                        'None'
                    }</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketDetailsInformation