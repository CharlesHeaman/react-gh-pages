import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { GasBottle } from "../../../../types/gasBottle.types"
import { RefrigerantResponseData } from "../../../../types/refrigerant.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../types/user.types"
import AssignmentStatus from "../../../Vehicles/VehiclePage/components/components/VehicleAssignment/components/AssignmentStatus"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import BottleInformationDetails from "./BottleInformationDetails"
import BottleRentalDetails from "./BottleRentalDetails"

const GasBottleInformation = (props: {
    gasBottleData: GasBottle,
    refrigerant: RefrigerantResponseData,
    supplier: SupplierManufacturerResponseData,
    user: UserResponseData | undefined,
    isConsumable?: boolean,
    lastAssignmentUpdate: Date | undefined,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.gasBottleData.is_active ? <InactiveStatus resourceName='Bottle' inactiveDate={props.lastDeactivate}/> : null}
            {props.gasBottleData.is_queued ? <section>
                <InnerContainer color="dark-purple">
                    <IconTitleText 
                        title="Queued for Return" 
                        text="This bottle has been queued for return." 
                        iconFont={"assignment_return"}
                        color="dark-purple"
                    />
                </InnerContainer>
            </section> : null}
            <BottleInformationDetails
                gasBottle={props.gasBottleData}
                refrigerant={props.refrigerant}
                isConsumable={props.isConsumable}
            />
            {props.gasBottleData.is_active && !props.gasBottleData.supplier_returned_by_id && !props.gasBottleData.is_queued ? <>
                <hr/>
                <section>
                    <h2>Assignment</h2>
                    <AssignmentStatus
                        user={props.user}
                        lastAssignmentUpdate={props.lastAssignmentUpdate}
                        resourceName='bottle'
                    />
                </section>
            </> : null}
            {props.gasBottleData.is_active && <>
                <hr/>
                <BottleRentalDetails
                    gasBottle={props.gasBottleData}
                    supplier={props.supplier}
                />
            </>}
        </>
    )
}

export default GasBottleInformation