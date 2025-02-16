import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CreateSupplierManufacturerAttributes, SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";
import putAPI from "../../../../utils/putAPI";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import SupplierManufacturerAccountsInformationForm from "../../CreateSupplierManufacturer/components/SupplierManufacturerAccontsInformationForm";
import SupplierManufacturerContactInformationForm from "../../CreateSupplierManufacturer/components/SupplierManufacturerContactInformationForm";
import SupplierManufacturerDetailsForm from "../../CreateSupplierManufacturer/components/SupplierManufacturerDetailsForm";
import isSupplierManufacturerAccountsInformationFormValid from "../../CreateSupplierManufacturer/utils/isSupplierManufacturerAccountsInformationFormValid";
import isSupplierManufacturerContactInformationFormValid from "../../CreateSupplierManufacturer/utils/isSupplierManufacturerContactInformationFormValid";
import isSupplierManufacturerDetailsFormValid from "../../CreateSupplierManufacturer/utils/isSupplierManufacturerDetailsFormValid";
import checkUniqueSupplierManufacturerCode from "../../utils/checkUniqueSupplierManufacturerCode";

const EditSupplierManufacturerForm = (props: {
    supplierManufacturer: SupplierManufacturerResponseData,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    const navigate = useNavigate();

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [supplierManufacturerDetails, setSupplierManufacturerDetails] = useState<CreateSupplierManufacturerAttributes>({
        name: props.supplierManufacturer.data.name,
        code: props.supplierManufacturer.data.code,
        address: props.supplierManufacturer.data.address ? props.supplierManufacturer.data.address : '',
        postcode: props.supplierManufacturer.data.postcode ? props.supplierManufacturer.data.postcode : '',
        notes: props.supplierManufacturer.data.notes ? props.supplierManufacturer.data.notes : '',
        email: props.supplierManufacturer.data.email ? props.supplierManufacturer.data.email : '',
        telephone: props.supplierManufacturer.data.telephone,
        website_url: props.supplierManufacturer.data.website_url ? props.supplierManufacturer.data.website_url : '',
        sage_name: props.supplierManufacturer.data.sage_name ? props.supplierManufacturer.data.sage_name : '',
        accounts_email: props.supplierManufacturer.data.accounts_email,
        accounts_telephone: props.supplierManufacturer.data.accounts_telephone,
        remittance_address: props.supplierManufacturer.data.remittance_address,
        accounts_notes: props.supplierManufacturer.data.accounts_notes ? props.supplierManufacturer.data.accounts_notes : '',
        is_supplier: props.supplierManufacturer.data.is_supplier,
        is_manufacturer: props.supplierManufacturer.data.is_manufacturer,
        is_sub_contractor: props.supplierManufacturer.data.is_sub_contractor,
        is_gas_supplier: props.supplierManufacturer.data.is_gas_supplier
    });
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(true);

    const formComplete = (
        isSupplierManufacturerDetailsFormValid(supplierManufacturerDetails, codeUnique) && 
        isSupplierManufacturerContactInformationFormValid(supplierManufacturerDetails) && 
        isSupplierManufacturerAccountsInformationFormValid(supplierManufacturerDetails)
    )

    const updateSupplierManufacturerParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSupplierManufacturerDetails)
    }

    const updateSupplierManufacturerCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setSupplierManufacturerDetails)
    }

    const updateSupplierManufacturer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`suppliers_manufacturers/${props.supplierManufacturer.id}/update`, {}, supplierManufacturerDetails, (response: any) => {
            const supplierManufacturerData: SupplierManufacturerResponseData = response.data;
            props.setSupplierManufacturerData(supplierManufacturerData);
            props.disabledEdit()
            navigate(`../${supplierManufacturerData.data.code}`, { relative: "path", replace: true })
        }, setIsUpdating)
    }

    return (
        <>
            <SupplierManufacturerDetailsForm 
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                updateCheckboxParams={updateSupplierManufacturerCheckboxParams}
                supplierManufacturerCodeUnique={codeUnique}
                checkUniqueSupplierManufacturerCode={() => checkUniqueSupplierManufacturerCode(supplierManufacturerDetails.code, setCodeUnique, setIsCodeLoading, props.supplierManufacturer.id)}
                showErrors
                isEdit
            />
            <hr/>
            <SupplierManufacturerContactInformationForm 
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                showErrors
                isEdit
            />
            <hr/>
            <SupplierManufacturerAccountsInformationForm
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateSupplierManufacturer}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditSupplierManufacturerForm