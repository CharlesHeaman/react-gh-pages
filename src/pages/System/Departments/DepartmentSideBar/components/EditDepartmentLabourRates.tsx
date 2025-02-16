import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateDepartmentAttributes, DepartmentResponseData } from "../../../../../types/department.types";
import putAPI from "../../../../../utils/putAPI";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import DepartmentLabourRatesForm from "../../CreateDepartmentPage/components/DepartmentLabourRatesForm";
import isDepartmentLabourRatesFormValid from "../../CreateDepartmentPage/utils/isDepartmentLabourRatesFormValid";

const EditDepartmentLabourRates = (props: {
    department: DepartmentResponseData,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
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
        contract_mileage_rate: props.department.data.contract_mileage_rate.toString(),
        contract_engineer_rate: props.department.data.contract_engineer_rate.toString(),
        contract_mate_rate: props.department.data.contract_mate_rate.toString(),
        contract_material_markup: props.department.data.contract_material_markup.toString(),
        contract_subcontract_markup: props.department.data.contract_subcontract_markup.toString(),
        contract_hire_markup: props.department.data.contract_hire_markup.toString(),
    });

    const formComplete = (
        isDepartmentLabourRatesFormValid(departmentDetails)
    )

    const updateDepartmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setDepartmentDetails)
    }

    const updateDepartment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`departments/${props.department.id}/update_rates`, {}, departmentDetails, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            props.setDepartmentData(departmentData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    return (
        <WindowOverlay
            title="Edit Labour Rates"
            maxWidth={500}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text="Save Changes" 
                iconFont="save"
                clickFunc={updateDepartment}                
                submitting={isUpdating}
                submittingText="Saving..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <DepartmentLabourRatesForm 
                departmentDetails={departmentDetails} 
                updateParams={updateDepartmentParams} 
                showErrors
            />
        </WindowOverlay>
    )
}

export default EditDepartmentLabourRates