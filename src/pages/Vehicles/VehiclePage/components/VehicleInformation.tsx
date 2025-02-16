import { CostCentreResponseData } from "../../../../types/costCentres.types"
import { UserResponseData } from "../../../../types/user.types"
import { VehicleResponseData } from "../../../../types/vehicles.types"
import AssignmentStatus from "./components/VehicleAssignment/components/AssignmentStatus"
import InactiveStatus from "./InactiveStatus"
import VehicleAccountsInformation from "./VehicleAccountsInformation"
import VehicleDocuments from "./VehicleDocuments"
import VehicleInformationDetails from "./VehicleInformationDetails"
import VehicleMOTTax from "./VehicleMOTTax"

const VehicleInformation = (props: {
    vehicle: VehicleResponseData,
    costCentre: CostCentreResponseData,
    user: UserResponseData | undefined,
    lastAssignmentUpdate: Date | undefined,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.vehicle.data.is_active ? <InactiveStatus resourceName='Vehicle' inactiveDate={props.lastDeactivate}/> : null}
            <VehicleInformationDetails vehicleData={props.vehicle.data}/>
            <hr/>
            <VehicleAccountsInformation costCentre={props.costCentre}/>
            <hr/>
            <section>
                <h2>Assignment</h2>
                <AssignmentStatus
                    user={props.user}
                    lastAssignmentUpdate={props.lastAssignmentUpdate}
                    resourceName="vehicle"
                />
            </section>
            <hr/>
            <VehicleMOTTax
                motDueDate={props.vehicle.data.mot_due_date}
                taxDueDate={props.vehicle.data.tax_due_date}
            />
            <hr/>
            <VehicleDocuments
                vehicleID={props.vehicle.id}
            />
        </>
    )
}

export default VehicleInformation