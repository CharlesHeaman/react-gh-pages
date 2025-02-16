import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreatePlantEquipmentTypeAttributes, PlantEquipmentTypeResponseData } from "../../../../../types/plantEquipmentTypes.types";
import postAPI from "../../../../../utils/postAPI";
import updateStateCheckboxParams from "../../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import PlantEquipmentTypeDetailsForm from "./components/PlantEquipmentTypeDetailsForm";

const CreatePlantEquipmentType = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [plantEquipmentTypeDetails, setPlantEquipmentTypeDetails] = useState<CreatePlantEquipmentTypeAttributes>({
        name: '',
        description: '',
        is_pa_test_required: false,
        is_calibration_test_required: false,
        is_inspection_required: false,
        is_maintenance_required: false,
        pa_test_frequency: '12',
        calibration_test_frequency: '12',
        inspection_frequency: '12',
        maintenance_frequency: '12',
    });

    const updatePlantEquipmentTypeParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setPlantEquipmentTypeDetails)
    }

    const updatePlantEquipmentTypeCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setPlantEquipmentTypeDetails)
    }

    const createPlantEquipmentType = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('plant_equipment_types/create', {}, plantEquipmentTypeDetails, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeResponseData = response.data;
            navigate(plantEquipmentTypeData.id.toString())
        }, setIsCreating)
    }

    const formComplete = (
        plantEquipmentTypeDetails.name.length > 0
    )

    return (
        <WindowOverlay 
            title={"Create Plant/Tools Type"} 
            maxWidth={400} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Plant/Tools Type"
                iconFont="add"
                color="dark-blue"
                clickFunc={createPlantEquipmentType}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <PlantEquipmentTypeDetailsForm
                plantEquipmentTypeDetails={plantEquipmentTypeDetails}
                updateParams={updatePlantEquipmentTypeParams}
                updateCheckboxParams={updatePlantEquipmentTypeCheckboxParams}
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default CreatePlantEquipmentType