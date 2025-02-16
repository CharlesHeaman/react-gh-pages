import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CreateDepartmentAttributes, DepartmentResponseData } from "../../../../../types/department.types";
import putAPI from "../../../../../utils/putAPI";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import DepartmentDetailsForm from "../../CreateDepartmentPage/components/DepartmentDetailsForm";
import isDepartmentDetailsFormValid from "../../CreateDepartmentPage/utils/isDepartmentDetailsFormValid";

const EditDepartmentForm = (props: {
    department: DepartmentResponseData,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [departmentDetails, setDepartmentDetails] = useState<CreateDepartmentAttributes>({
        name: props.department.data.name,
        description: props.department.data.description ? props.department.data.description : '',
        day_max_hours: props.department.data.day_max_hours.toString(),
        mileage_rate: props.department.data.mileage_rate.toString(),
        engineer_rate: props.department.data.engineer_rate.toString(),
        mate_rate: props.department.data.mate_rate.toString(),
        material_markup: props.department.data.material_markup.toString(),
        subcontract_markup: props.department.data.subcontract_markup.toString(),
        hire_markup: props.department.data.hire_markup.toString(),
    });

    const formComplete = (
        isDepartmentDetailsFormValid(departmentDetails)
    )

    const updateDepartmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setDepartmentDetails)
    }

    const updateDepartment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`departments/${props.department.id}/update`, {}, departmentDetails, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            props.setDepartmentData(departmentData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    return (
        <>
            <DepartmentDetailsForm 
                departmentDetails={departmentDetails} 
                updateParams={updateDepartmentParams} 
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateDepartment}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditDepartmentForm