import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import FormErrorMessage from "../../../../../components/form/FormErrorMessage/FormErrorMessage";
import InputLabelWrap from "../../../../../components/form/InputLabelWrap/InputLabelWrap";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { ContractResponseData, CreateContractAttributes } from "../../../../../types/contract.types";
import putAPI from "../../../../../utils/putAPI";
import updateStateCheckboxParams from "../../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateDateParams from "../../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import ContractDetailsForm from "../../CreateContract/components/ContractDetailsForm";
import CreateContractAccountsInformationForm from "../../CreateContract/components/CreateContractAccountsInformationForm";
import checkUniqueReferenceNumber from "../../CreateContract/utils/checkUniqueReferenceNumber";
import isContractDetailsFormValid from "../../CreateContract/utils/isContractDetailsFormValid";
import { useNavigate } from "react-router-dom";
import { DepartmentResponseData } from "../../../../../types/department.types";
import CreateContractRatesForm from "../../CreateContract/components/CreateContractRatesForm";
import isContractRatesFormValid from "../../CreateContract/utils/isContractRateFormValid";

const EditContractForm = (props: {
    contract: ContractResponseData,
    department: DepartmentResponseData,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    const navigate = useNavigate();

    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [contractDetails, setContractDetails] = useState<CreateContractAttributes>({
        reference_number: props.contract.data.reference_number,
        contract_value: props.contract.data.contract_value.toString(),
        start_at: new Date(props.contract.data.start_at),
        end_at: new Date(props.contract.data.end_at),
        is_fixed_three_year: props.contract.data.is_fixed_three_year,
        service_per_year: props.contract.data.service_per_year.toString(),
        purchase_order_number: props.contract.data.purchase_order_number ? props.contract.data.purchase_order_number : '',
        notes: props.contract.data.notes ? props.contract.data.notes : '',
        engineer_rate: props.contract.data.engineer_rate.toString(),
        mate_rate: props.contract.data.mate_rate.toString(),
        mileage_rate: props.contract.data.mileage_rate.toString(),
        material_markup: props.contract.data.material_markup.toString(),
        subcontract_markup: props.contract.data.subcontract_markup.toString(),
        hire_markup: props.contract.data.hire_markup.toString(),
    });
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(true);
    const [invoicePeriod, setInvoicePeriod] = useState(props.contract.data.invoice_period);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData | undefined>(props.department);

    const formComplete = (
        isContractDetailsFormValid(contractDetails, codeUnique, departmentData?.id) && 
        isContractRatesFormValid(contractDetails)
    )

    const updateContractParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setContractDetails)
    }

    const updateContractCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setContractDetails)
    }

    const updateContractDateParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateDateParams(event, setContractDetails)
    }

    const updateContract = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`contracts/${props.contract.id}/update`, {}, {
            ...contractDetails,
            department_id: departmentData?.id,
            invoice_period: invoicePeriod
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            props.setContractData(contractData);
            props.disabledEdit();
            navigate(`../${contractData.data.reference_number}`, { replace: true, relative: 'path' })
        }, setIsUpdating)
    }

    return (
        <>
            <ContractDetailsForm
                contractDetails={contractDetails}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateContractParams}
                updateCheckboxParams={updateContractCheckboxParams}
                updateDateParams={updateContractDateParams}
                referenceNumberUnique={codeUnique}
                checkUniqueReferenceNumber={() => checkUniqueReferenceNumber(contractDetails.reference_number, setCodeUnique, setIsCodeLoading, props.contract.id)}
                showErrors      
                isEdit     
            />
            <hr/>
            <CreateContractRatesForm
                contractDetails={contractDetails}
                updateParams={updateContractParams}
                showErrors
                isEdit
            />
            <hr/>
            <CreateContractAccountsInformationForm
                contractDetails={contractDetails}
                updateParams={updateContractParams}
                invoicePeriod={invoicePeriod}
                setInvoicePeriod={setInvoicePeriod}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateContract}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditContractForm