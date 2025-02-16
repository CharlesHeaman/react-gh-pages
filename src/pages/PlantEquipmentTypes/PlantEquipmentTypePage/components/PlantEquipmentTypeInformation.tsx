import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../../components/ui/General/Label/Label"
import { PlantEquipmentType } from "../../../../types/plantEquipmentTypes.types"
import formatDate from "../../../../utils/formatDate"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"

const PlantEquipmentTypeInformation = (props: {
    plantEquipmentTypeData: PlantEquipmentType,
    lastDeactivate: Date | undefined,
}) => {
    return (
        <>
            {!props.plantEquipmentTypeData.is_active ? <InactiveStatus resourceName='Plant/Tools Type' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Plant/Tools Type Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.plantEquipmentTypeData.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.plantEquipmentTypeData.description ? props.plantEquipmentTypeData.description : 'None'}</p>
                    </GridItem>
                </InfoGrid>
                <hr/>
                <InfoGrid>
                    <GridItem title='PA Test Required' span={3}>
                        <BooleanLabel true={props.plantEquipmentTypeData.is_pa_test_required}/>
                    </GridItem>
                    <GridItem title='PA Test Frequency' span={3}>
                        <p>{props.plantEquipmentTypeData.is_pa_test_required && props.plantEquipmentTypeData.pa_test_frequency ? `${props.plantEquipmentTypeData.pa_test_frequency} months` : <Label color="grey" text="N/A"/>}</p>
                    </GridItem>
                    <GridItem title='Calibration Test Required' span={3}>
                        <BooleanLabel true={props.plantEquipmentTypeData.is_calibration_test_required}/>
                    </GridItem>
                    <GridItem title='Calibration Test Frequency' span={3}>
                        <p>{props.plantEquipmentTypeData.is_calibration_test_required && props.plantEquipmentTypeData.calibration_test_frequency ? `${props.plantEquipmentTypeData.calibration_test_frequency} months` : <Label color="grey" text="N/A"/>}</p>
                    </GridItem>
                    <GridItem title='Inspection Required' span={3}>
                        <BooleanLabel true={props.plantEquipmentTypeData.is_inspection_required}/>
                    </GridItem>
                    <GridItem title='Inspection Frequency' span={3}>
                        <p>{props.plantEquipmentTypeData.is_inspection_required && props.plantEquipmentTypeData.inspection_frequency ? `${props.plantEquipmentTypeData.inspection_frequency} months` : <Label color="grey" text="N/A"/>}</p>
                    </GridItem>
                    <GridItem title='Maintenance Required' span={3}>
                        <BooleanLabel true={props.plantEquipmentTypeData.is_maintenance_required}/>
                    </GridItem>
                    <GridItem title='Maintenance Frequency' span={3}>
                        <p>{props.plantEquipmentTypeData.is_maintenance_required && props.plantEquipmentTypeData.maintenance_frequency ? `${props.plantEquipmentTypeData.maintenance_frequency} months` : <Label color="grey" text="N/A"/>}</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default PlantEquipmentTypeInformation