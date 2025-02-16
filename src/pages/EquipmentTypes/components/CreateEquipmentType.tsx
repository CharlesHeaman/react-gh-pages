import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateEquipmentTypeAttributes, EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import EquipmentTypeDetailsForm from "./EquipmentTypeDetailsForm";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import isEquipmentTypeDetailsFormValid from "./isEquipmentTypeDetailsFormValid";
import { DepartmentResponseData } from "../../../types/department.types";

const CreateEquipmentType = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [equipmentTypeDetails, setEquipmentTypeDetails] = useState<CreateEquipmentTypeAttributes>({
        name: '',
        is_master: false,
        is_slave: false,
        service_duration: '0',
        slave_quantity: '0',
        is_variable_slave_quantity: false
    });
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [selectedEnergySource, setSelectedEnergySource] = useState<number | null>(null);

    useEffect(() => {
        setEquipmentTypeDetails(prevState => {
            return {
                ...prevState,
                slave_quantity: '0',
                is_variable_slave_quantity: false
            }
        })
    }, [equipmentTypeDetails.is_master]);

    useEffect(() => {
        setEquipmentTypeDetails(prevState => {
            return {
                ...prevState,
                slave_quantity: '0',
            }
        })
    }, [equipmentTypeDetails.is_variable_slave_quantity]);

    const updateEquipmentTypeParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setEquipmentTypeDetails)
    }

    const updateEquipmentTypeCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setEquipmentTypeDetails)
    }

    const formComplete = isEquipmentTypeDetailsFormValid(equipmentTypeDetails, departmentData);

    const createEquipmentType = () => {
        if (!formComplete) return;
        postAPI('equipment_types/create', {}, {
            ...equipmentTypeDetails,
            energy_source: selectedEnergySource,
            slave_quantity: !equipmentTypeDetails.is_variable_slave_quantity ? equipmentTypeDetails.slave_quantity : -1,
            department_ids: departmentData.map(department => department.id)
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeResponseData = response.data;
            navigate(equipmentTypeData.id.toString())
        }, setIsCreating)
    }


    return (
        <WindowOverlay 
            title={"Create Equipment Type"} 
            maxWidth={700} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Equipment Type"
                iconFont="add"
                color="dark-blue"
                clickFunc={() => {
                    setHasSubmitted(true);
                    createEquipmentType();
                }}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <EquipmentTypeDetailsForm
                equipmentTypeDetails={equipmentTypeDetails}
                selectedEnergySource={selectedEnergySource}
                setSelectedEnergySource={setSelectedEnergySource}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateEquipmentTypeParams}
                updateCheckboxParams={updateEquipmentTypeCheckboxParams}
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default CreateEquipmentType