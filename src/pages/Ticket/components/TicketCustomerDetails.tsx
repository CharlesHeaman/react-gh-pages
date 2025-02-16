import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import NewEquipmentLink from "../../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../../components/ui/Links/SiteLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { EquipmentResponseData } from "../../../types/equipment.types"
import { SiteResponseData } from "../../../types/sites.types"

const TicketCustomerDetails = (props: {
    isPlannedMaintenance: boolean,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
}) => {
    return (
        <section>
            <h2>Customer Details</h2>
            <InfoGrid>
                <GridItem title='Customer' span={3}>
                    <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                </GridItem>
                <GridItem title='Site' span={3}>
                    <p>{props.site ? <SiteLink code={props.site.data.code} name={props.site.data.name}/> : 'Unknown'}</p>
                </GridItem>
                {!props.isPlannedMaintenance ? <GridItem title='Equipment' span={3}>
                    <p>{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'Unknown'}</p>
                </GridItem> : null}
            </InfoGrid>
        </section>
    )
}

export default TicketCustomerDetails