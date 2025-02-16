import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../../components/form/FormWizardFlex";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CreateDepartmentAttributes, DepartmentResponseData } from "../../../../types/department.types";
import postAPI from "../../../../utils/postAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import DepartmentDetailsForm from "./components/DepartmentDetailsForm";
import DepartmentLabourRatesForm from "./components/DepartmentLabourRatesForm";
import isDepartmentDetailsFormValid from "./utils/isDepartmentDetailsFormValid";
import isDepartmentLabourRatesFormValid from "./utils/isDepartmentLabourRatesFormValid";
import DepartmentLabourRates from "../DepartmentPage/components/DepartmentLabourRates";
import DepartmentDetailsInformation from "../DepartmentPage/components/DepartmentDetailsInformation";


const CreateDepartmentPage = () => {
    const navigate = useNavigate();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [createDepartmentDetails, setCreateDepartmentDetails] = useState<CreateDepartmentAttributes>({
        name: '',
        description: '',
        day_max_hours: '8',
        mileage_rate: '0',
        engineer_rate: '0',
        mate_rate: '0',
        material_markup: '0',
        subcontract_markup: '0',
        hire_markup: '0',
        contract_mileage_rate: '0',
        contract_engineer_rate: '0',
        contract_mate_rate: '0',
        contract_material_markup: '0',
        contract_subcontract_markup: '0',
        contract_hire_markup: '0',
    });

    const updateDepartmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateDepartmentDetails)
    }

    const createDepartment = () => {
        postAPI('departments/create', {}, {
            ...createDepartmentDetails,
        }, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            navigate(`../${departmentData.id}`, { relative: "path" })
        }, setIsCreating)
    }

    const departmentPreviewInformation = {
        ...createDepartmentDetails,
        uses_equipment_module: false,
        uses_fuel_module: false,
        uses_refrigerant_module: false,
        uses_schedule_of_works_module: false,
        is_active: true,
        label_color: '',
        engineer_rate: parseFloat(createDepartmentDetails.engineer_rate),
        mate_rate: parseFloat(createDepartmentDetails.mate_rate),
        mileage_rate: parseFloat(createDepartmentDetails.mileage_rate),
        material_markup: parseFloat(createDepartmentDetails.material_markup),
        subcontract_markup: parseFloat(createDepartmentDetails.subcontract_markup),
        hire_markup: parseFloat(createDepartmentDetails.hire_markup),
        contract_engineer_rate: parseFloat(createDepartmentDetails.contract_engineer_rate),
        contract_mate_rate: parseFloat(createDepartmentDetails.contract_mate_rate),
        contract_mileage_rate: parseFloat(createDepartmentDetails.contract_mileage_rate),
        contract_material_markup: parseFloat(createDepartmentDetails.contract_material_markup),
        contract_subcontract_markup: parseFloat(createDepartmentDetails.contract_subcontract_markup),
        contract_hire_markup: parseFloat(createDepartmentDetails.contract_hire_markup),
        day_max_hours: parseFloat(createDepartmentDetails.day_max_hours)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Department Details',
            form: <DepartmentDetailsForm
                departmentDetails={createDepartmentDetails}
                updateParams={updateDepartmentParams}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isDepartmentDetailsFormValid(createDepartmentDetails)
        },
        {
            header: 'Labour Rates',
            form: <DepartmentLabourRatesForm
                departmentDetails={createDepartmentDetails}
                updateParams={updateDepartmentParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isDepartmentLabourRatesFormValid(createDepartmentDetails)
        },
        {
            header: 'Review Information',
            form: <>
                <DepartmentDetailsInformation departmentData={departmentPreviewInformation}/>
                <hr/>
                <DepartmentLabourRates departmentData={departmentPreviewInformation}/>
            </>,
            isComplete: true
        }     
    ]

    return (
        <OuterContainer
            title='Create Department'
            description="Complete this form to create a department."
            maxWidth={850}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Department"
                isCreating={isCreating}
                createFunc={createDepartment}
            />
        </OuterContainer>
    )
}

export default CreateDepartmentPage