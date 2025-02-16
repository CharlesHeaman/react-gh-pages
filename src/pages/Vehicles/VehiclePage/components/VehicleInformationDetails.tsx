import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Vehicle } from "../../../../types/vehicles.types"
import formatDate from "../../../../utils/formatDate"

const VehicleInformationDetails = (props: {
    vehicleData: Vehicle
}) => {
    return (
        <section>
            <h2>Vehicle Details</h2>
            <InfoGrid>
                <GridItem title='Vehicle Registration' span={3}>
                    <p>{props.vehicleData.registration_number.toLocaleUpperCase()}</p>
                </GridItem>
                <GridItem title='Original Registration' span={3}>
                    <p>{props.vehicleData.original_registration_number ? props.vehicleData.original_registration_number : 'None'}</p>
                </GridItem>
                <GridItem title='Registration Date'>
                    <p>{formatDate(props.vehicleData.registration_date)}</p>
                </GridItem>
                <GridItem title='Make' span={3}>
                    <p>{props.vehicleData.make}</p>
                </GridItem>
                <GridItem title='Model' span={3}>
                    <p>{props.vehicleData.model}</p>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.vehicleData.notes ? props.vehicleData.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleInformationDetails