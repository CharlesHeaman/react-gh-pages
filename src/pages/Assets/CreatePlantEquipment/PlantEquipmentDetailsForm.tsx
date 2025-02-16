import { ChangeEvent, Dispatch, SetStateAction } from "react";
import TextInput from "../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateAssetAttributes } from "../../../types/asset.types";
import DepartmentSelect from "../../../components/form/DepartmentSelect/DepartmentSelect";
import { DepartmentResponseData } from "../../../types/department.types";
import OwnerSelect from "./OwnerSelect";
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types";
import PlantEquipmentTypeSelect from "../../../components/form/PlantEquipmentTypeSelect/PlantEquipmentTypeSelect";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import SupplierSelect from "../../../components/form/SupplierSelect/SupplierSelect";

const PlantEquipmentDetailsForm = (props: {
    plantEquipmentDetails: CreateAssetAttributes,
    selectedPlantEquipmentType: PlantEquipmentTypeResponseData | undefined,
    setSelectedPlantEquipmentType: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>,
    selectedManufacturer: SupplierManufacturerResponseData | undefined,
    setSelectedCManufacturer: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    selectedOwner: number,
    setSelectedOwner: Dispatch<SetStateAction<number>>,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Plant/Tools Details</h2>}
            <InfoGrid>                
                <GridItem title='Description'>
                    <TextInput
                        name="description"
                        label="Description"
                        value={props.plantEquipmentDetails.description}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Type' span={3}>
                    <PlantEquipmentTypeSelect
                        selectedPlantEquipmentType={props.selectedPlantEquipmentType}
                        setSelectedPlantEquipmentType={props.setSelectedPlantEquipmentType}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Manufacturer' span={3} secondaryTitle="(optional)">
                    <SupplierSelect 
                        selectedSupplier={props.selectedManufacturer} 
                        setSelectedSupplier={props.setSelectedCManufacturer} 
                        isManufacturer
                        hasSubmitted={props.showErrors}  
                    />
                </GridItem>
                <GridItem title='Model Number' span={3}>
                    <TextInput
                        name="model_no"
                        label="Model number"
                        value={props.plantEquipmentDetails.model_no}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Serial Number' span={3}>
                    <TextInput
                        name="serial_no"
                        label="Serial number"
                        value={props.plantEquipmentDetails.serial_no}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Owner' span={3}>
                    <OwnerSelect 
                        selectedOwner={props.selectedOwner} 
                        setSelectedOwner={props.setSelectedOwner}                
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Department' span={3} secondaryTitle="(optional)">
                    <DepartmentSelect
                        selectedDepartment={props.selectedDepartment}
                        setSelectedDepartment={props.setSelectedDepartment}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                {!props.isEdit && <GridItem title='Location' span={3}>
                    <TextInput
                        name="location"
                        label="Location"
                        value={props.plantEquipmentDetails.location}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>}
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.plantEquipmentDetails.notes}
                        label="Notes"
                        updateFunc={props.updateParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentDetailsForm