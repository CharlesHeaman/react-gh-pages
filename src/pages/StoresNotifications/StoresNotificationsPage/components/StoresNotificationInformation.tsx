import { ReactNode } from "react"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { StoresNotificationResponseData } from "../../../../types/storesNotifications.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { SiteResponseData } from "../../../../types/sites.types"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import getVanStockRequestStatusColor from "../../utils/getVanStockRequestStatusColor"
import getVanStockRequestStatusIcon from "../../utils/getVanStockRequestStatusIcon"
import getVanStockRequestStatusTitle from "../../utils/getVanStockRequestStatusTitle"
import getVanStockRequestStatusDescription from "../../utils/getVanStockRequestStatusDescription"
import { VehicleResponseData } from "../../../../types/vehicles.types"
import VehicleLink from "../../../Vehicles/components/VehicleLink"

const StoresNotificationInformation = (props: {
    storesNotification: StoresNotificationResponseData,
    user: UserResponseData,
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData,
    vehicle: VehicleResponseData | undefined,
}) => {
    return (
        <>
            <section>
                <InnerContainer color={getVanStockRequestStatusColor(props.storesNotification.data.status)}>
                    <IconTitleText
                        iconFont={getVanStockRequestStatusIcon(props.storesNotification.data.status)}
                        title={`Request ${getVanStockRequestStatusTitle(props.storesNotification.data.status)}`}
                        color={getVanStockRequestStatusColor(props.storesNotification.data.status)}
                        text={getVanStockRequestStatusDescription(props.storesNotification.data.status)}
                    />
                </InnerContainer>
            </section>
            <section>
                <h2>Ticket Information</h2>
                <InfoGrid>
                    <GridItem title='Ticket'>
                        <TicketLink 
                            ticket={props.ticket}
                            departmentName={props.department.data.name} 
                        />
                    </GridItem>
                    <GridItem title='Customer' span={3}>
                        <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                    </GridItem>
                    <GridItem title='Site' span={3}>
                        <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Request Information</h2>
                <InfoGrid>
                    <GridItem title='Requested By' span={3}>
                        <p><UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/></p>
                    </GridItem>
                    <GridItem title='Vehicle' span={3}>
                        <p>{props.vehicle ?
                            <VehicleLink vehicleID={props.vehicle.id} registrationNumber={props.vehicle.data.registration_number}/> : 
                            'None'
                        }</p>
                    </GridItem>
                    <GridItem title='Requested Materials'>
                        <p>{props.storesNotification.data.text}</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default StoresNotificationInformation