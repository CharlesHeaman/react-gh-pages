import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { AssetResponseData, CreateAssetAttributes } from "../../../../types/asset.types";
import { CostCentreResponseData } from "../../../../types/costCentres.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";
import putAPI from "../../../../utils/putAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import PlantEquipmentDetailsForm from "../../CreatePlantEquipment/PlantEquipmentDetailsForm";
import isPlantEquipmentDetailsFormValid from "../../CreatePlantEquipment/utils/isPlantEquipmentDetailsFormValid";

const EditPlantEquipmentForm = (props: {
    plantEquipment: AssetResponseData,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>,
    manufacturer: SupplierManufacturerResponseData | undefined,
    department: DepartmentResponseData | undefined,
    plantEquipmentType: PlantEquipmentTypeResponseData,
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [plantEquipmentDetails, setPlantEquipmentDetails] = useState<CreateAssetAttributes>({
        description: props.plantEquipment.data.description,
        model_no: props.plantEquipment.data.model_no,
        serial_no: props.plantEquipment.data.serial_no,
        location: '',
        notes: props.plantEquipment.data.notes ? props.plantEquipment.data.notes : '',
        purchase_order_number: '',
        purchase_date: new Date(),
        requires_pa_test: false,
        requires_calibration: false,
        requires_maintenance: false,
        requires_inspection: false,
        pa_test_volts: '0',
        pa_test_amps: '0',
        acceptable_tolerance: '',
        calibrated_externally: false,
        maintained_externally: false,
        external_maintainer: '',
        last_pa_test: null,
        last_calibration_test: null,
        last_maintenance: null,
        last_inspection: null,
        next_pa_test: null,
        next_calibration_test: null,
        next_maintenance: null,
        next_inspection: null,
        
    });

    const [owner, setOwner] = useState<number>(props.plantEquipment.data.ownership_type);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData | undefined>(props.department);
    const [typeData, setTypeData] = useState<PlantEquipmentTypeResponseData | undefined>(props.plantEquipmentType);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData | undefined>(props.manufacturer);
    
    const formComplete = isPlantEquipmentDetailsFormValid(plantEquipmentDetails, typeData?.id, true);
    
    const updatePlantEquipmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setPlantEquipmentDetails)
    }

    const updatePlantEquipment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`assets/${props.plantEquipment.id}/update`, {}, {
            ...plantEquipmentDetails,
            plant_equipment_type_id: typeData?.id,
            ownership_type: owner,
            department_id: departmentData?.id,
            manufacturer_id: manufacturerData?.id
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            props.setPlantEquipmentData(plantEquipmentData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    return (
        <>
            <PlantEquipmentDetailsForm
                plantEquipmentDetails={plantEquipmentDetails}
                selectedPlantEquipmentType={typeData}
                setSelectedPlantEquipmentType={setTypeData}
                selectedManufacturer={manufacturerData}
                setSelectedCManufacturer={setManufacturerData}
                selectedOwner={owner}
                setSelectedOwner={setOwner}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updatePlantEquipmentParams}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updatePlantEquipment}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditPlantEquipmentForm