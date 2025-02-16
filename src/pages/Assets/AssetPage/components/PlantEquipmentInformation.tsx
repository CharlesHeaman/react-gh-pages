import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { AssetResponseData } from "../../../../types/asset.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { PlantEquipmentDocumentsResponseData } from "../../../../types/plantEquipmentDocument.types"
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../types/user.types"
import AssignmentStatus from "../../../Vehicles/VehiclePage/components/components/VehicleAssignment/components/AssignmentStatus"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import PlantEquipmentInformationDetails from "../../components/PlantEquipmentInformationDetails"
import PlantEquipmentPurchaseInformation from "../../components/PlantEquipmentPurchaseInformation"
import PlantEquipmentCalibration from "./PlantEquipmentCalibration"
import PlantEquipmentDocuments from "./PlantEquipmentDocuments"
import PlantEquipmentInspection from "./PlantEquipmentInspection"
import PlantEquipmentMaintenance from "./PlantEquipmentMaintenance"
import PlantEquipmentPATesting from "./PlantEquipmentPATesting"

const AssetInformation = (props: {
    asset: AssetResponseData,
    manufacturer: SupplierManufacturerResponseData | undefined,
    department: DepartmentResponseData | undefined,
    user: UserResponseData | undefined,
    plantEquipmentType: PlantEquipmentTypeResponseData,
    lastAssignmentUpdate: Date | undefined,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.asset.data.is_active ? <InactiveStatus resourceName='Asset' inactiveDate={props.lastDeactivate}/> : null}
            <PlantEquipmentInformationDetails
                plantEquipmentData={props.asset.data}
                manufacturer={props.manufacturer}
                plantEquipmentType={props.plantEquipmentType}
                department={props.department}
            />
            <hr/>
            <PlantEquipmentPurchaseInformation
                plantEquipmentData={props.asset.data}
            />
            <hr/>
            <section>
                <h2>Assignment</h2>
                <InfoGrid>
                    <GridItem>
                        <AssignmentStatus
                            user={props.user}
                            lastAssignmentUpdate={props.lastAssignmentUpdate}
                            resourceName='plant/tools'
                        />
                    </GridItem>
                    <GridItem title='Location' span={3}>
                        <p>{props.asset.data.location}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            {props.asset.data.requires_pa_test && <>
                <hr/>
                <PlantEquipmentPATesting
                    plantEquipmentData={props.asset.data}
                />
            </>}
            {props.asset.data.requires_calibration && <>
                <hr/>
                <PlantEquipmentCalibration
                    plantEquipmentData={props.asset.data}
                />
            </>}
            {props.asset.data.requires_inspection && <>
                <hr/>
                <PlantEquipmentInspection
                    plantEquipmentData={props.asset.data}
                />
            </>}
            {props.asset.data.requires_maintenance && <>
                <hr/>
                <PlantEquipmentMaintenance
                    plantEquipmentData={props.asset.data}
                />
            </>}
            <hr/>
            <PlantEquipmentDocuments
                plantEquipmentID={props.asset.id}
            />
        </>
    )
}

export default AssetInformation