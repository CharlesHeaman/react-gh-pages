import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { PlantEquipmentTypeResponseData, CreatePlantEquipmentTypeAttributes } from "../../../../types/plantEquipmentTypes.types";
import putAPI from "../../../../utils/putAPI";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import PlantEquipmentTypeDetailsForm from "../../PlantEquipmentTypesListPage/components/CreatePlantEquipmentType/components/PlantEquipmentTypeDetailsForm";

const EditPlantEquipmentTypeForm = (props: {
    plantEquipmentType: PlantEquipmentTypeResponseData,
    setPlantEquipmentTypeData: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [plantEquipmentTypeDetails, setPlantEquipmentTypeDetails] = useState<CreatePlantEquipmentTypeAttributes>({
        name: props.plantEquipmentType.data.name,
        description: props.plantEquipmentType.data.description ? props.plantEquipmentType.data.description : '',
        is_pa_test_required: props.plantEquipmentType.data.is_pa_test_required,
        is_calibration_test_required: props.plantEquipmentType.data.is_calibration_test_required,
        is_inspection_required: props.plantEquipmentType.data.is_inspection_required,
        is_maintenance_required: props.plantEquipmentType.data.is_maintenance_required,
        pa_test_frequency: props.plantEquipmentType.data.pa_test_frequency ? props.plantEquipmentType.data.pa_test_frequency.toString() : '12',
        calibration_test_frequency: props.plantEquipmentType.data.calibration_test_frequency ? props.plantEquipmentType.data.calibration_test_frequency.toString() : '12',
        inspection_frequency: props.plantEquipmentType.data.inspection_frequency ? props.plantEquipmentType.data.inspection_frequency.toString() : '12',
        maintenance_frequency: props.plantEquipmentType.data.maintenance_frequency ? props.plantEquipmentType.data.maintenance_frequency.toString() : '12',
    });

    const updatePlantEquipmentTypeParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setPlantEquipmentTypeDetails)
    }

    const updatePlantEquipmentTypeCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setPlantEquipmentTypeDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`plant_equipment_types/${props.plantEquipmentType.id}/update`, {}, plantEquipmentTypeDetails, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeResponseData = response.data;
            props.setPlantEquipmentTypeData(plantEquipmentTypeData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    const formComplete = (
        plantEquipmentTypeDetails.name.length > 0
    )

    return (
        <>
            <PlantEquipmentTypeDetailsForm
                plantEquipmentTypeDetails={plantEquipmentTypeDetails}
                updateParams={updatePlantEquipmentTypeParams}
                updateCheckboxParams={updatePlantEquipmentTypeCheckboxParams}
                showErrors={hasSubmitted}
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditPlantEquipmentTypeForm