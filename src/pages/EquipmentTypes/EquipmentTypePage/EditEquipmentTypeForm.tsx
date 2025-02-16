import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { EquipmentTypeResponseData, CreateEquipmentTypeAttributes } from "../../../types/equipmentType.types";
import putAPI from "../../../utils/putAPI";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import EquipmentTypeDetailsForm from "../components/EquipmentTypeDetailsForm";
import isEquipmentTypeDetailsFormValid from "../components/isEquipmentTypeDetailsFormValid";
import { DepartmentResponseData } from "../../../types/department.types";

const EditEquipmentTypeForm = (props: {
    equipmentType: EquipmentTypeResponseData,
    setEquipmentTypeData: Dispatch<SetStateAction<EquipmentTypeResponseData | undefined>>,
    departments: Array<DepartmentResponseData>,
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [equipmentTypeDetails, setEquipmentTypeDetails] = useState<CreateEquipmentTypeAttributes>({
        name: props.equipmentType.data.name,
        is_master: props.equipmentType.data.is_master,
        is_slave: props.equipmentType.data.is_slave,
        service_duration: props.equipmentType.data.service_duration.toString(),
        slave_quantity: props.equipmentType.data.slave_quantity.toString(),
        is_variable_slave_quantity: props.equipmentType.data.slave_quantity === -1
    });
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>(props.departments);
    const [selectedEnergySource, setSelectedEnergySource] = useState<number | null>(props.equipmentType.data.energy_source);

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
    
    const updateEquipmentType = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`equipment_types/${props.equipmentType.id}/update`, {}, {
            ...equipmentTypeDetails,
            slave_quantity: !equipmentTypeDetails.is_variable_slave_quantity ? equipmentTypeDetails.slave_quantity : -1,
            energy_source: selectedEnergySource,
            department_ids: departmentData.map(department => department.id)
        }, (response: any) => {
            const contactData: EquipmentTypeResponseData = response.data;
            props.setEquipmentTypeData(contactData);
            props.disabledEdit()
        }, setIsUpdating)
    }

    return (
        <>
            <EquipmentTypeDetailsForm 
                equipmentTypeDetails={equipmentTypeDetails} 
                selectedEnergySource={selectedEnergySource}
                setSelectedEnergySource={setSelectedEnergySource}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateEquipmentTypeParams} 
                updateCheckboxParams={updateEquipmentTypeCheckboxParams}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateEquipmentType}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditEquipmentTypeForm