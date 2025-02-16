import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { CreateSupplierManufacturerAttributes, SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import SupplierManufacturerNavigation from "../components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import SupplierManufacturerInformation from "../SupplierManufacturerPage/components/SupplierManufacturerInformation";
import checkUniqueSupplierManufacturerCode from "../utils/checkUniqueSupplierManufacturerCode";
import SupplierManufacturerAccountsInformationForm from "./components/SupplierManufacturerAccontsInformationForm";
import SupplierManufacturerContactInformationForm from "./components/SupplierManufacturerContactInformationForm";
import SupplierManufacturerDetailsForm from "./components/SupplierManufacturerDetailsForm";
import isSupplierManufacturerAccountsInformationFormValid from "./utils/isSupplierManufacturerAccountsInformationFormValid";
import isSupplierManufacturerContactInformationFormValid from "./utils/isSupplierManufacturerContactInformationFormValid";
import isSupplierManufacturerDetailsFormValid from "./utils/isSupplierManufacturerDetailsFormValid";
import postAPI from "../../../utils/postAPI";
import SupplierManufacturerInformationDetails from "../SupplierManufacturerPage/components/SupplierManufacturerInformationDetails";
import SupplierManufacturerContactInformation from "../SupplierManufacturerPage/components/SupplierManufacturerContactInformation";
import SupplierManufacturerAccountsInformation from "../SupplierManufacturerPage/components/SupplierManufacturerAccountsInformation";

const CreateSupplierManufacturerPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [supplierManufacturerDetails, setSupplierManufacturerDetails] = useState<CreateSupplierManufacturerAttributes>({
        name: '',
        code: '',
        address: '',
        postcode: '',
        notes: '',
        email: '',
        telephone: '',
        website_url: '',
        sage_name: '',
        accounts_email: '',
        accounts_telephone: '',
        remittance_address: '',
        accounts_notes: '',
        is_supplier: false,
        is_manufacturer: false,
        is_sub_contractor: false,
        is_gas_supplier: false
    });

    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(false);

    useEffect(() => {
        setSupplierManufacturerDetails((prevState: any) => {
            return {
                ...prevState, 
                accounts_email: supplierManufacturerDetails.email
            }
        });
    }, [supplierManufacturerDetails.email]);

    useEffect(() => {
        setSupplierManufacturerDetails((prevState: any) => {
            return {
                ...prevState, 
                accounts_telephone: supplierManufacturerDetails.telephone
            }
        });
    }, [supplierManufacturerDetails.telephone]);

    useEffect(() => {
        setSupplierManufacturerDetails((prevState: any) => {
            return {
                ...prevState, 
                remittance_address: `${supplierManufacturerDetails.address}
${supplierManufacturerDetails.postcode}`
            }
        });
    }, [supplierManufacturerDetails.address, supplierManufacturerDetails.postcode]);

    const updateSupplierManufacturerParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSupplierManufacturerDetails)
    }

    const updateSupplierManufacturerCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setSupplierManufacturerDetails)
    }

    const createSupplierManufacturer = () => {
        postAPI('suppliers_manufacturers/create', {}, {
            ...supplierManufacturerDetails,
        }, (response: any) => {
            const supplierManufacturerData: SupplierManufacturerResponseData = response.data;
            navigate(`../${supplierManufacturerData.data.code}`, { relative: "path" })
        }, setIsCreating)
    }

    const supplierManufacturerPreviewData = {
        ...supplierManufacturerDetails,
        is_active: true,
        is_approved: null,
        approval_updated_at: null,
        approval_updated_by_id: null
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Supplier/Manufacturer Details',
            form: <SupplierManufacturerDetailsForm 
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                updateCheckboxParams={updateSupplierManufacturerCheckboxParams}
                supplierManufacturerCodeUnique={codeUnique}
                checkUniqueSupplierManufacturerCode={() => checkUniqueSupplierManufacturerCode(supplierManufacturerDetails.code, setCodeUnique, setIsCodeLoading)}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isSupplierManufacturerDetailsFormValid(supplierManufacturerDetails, codeUnique)
        },
        {
            header: 'Contact Information',
            form: <SupplierManufacturerContactInformationForm 
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isSupplierManufacturerContactInformationFormValid(supplierManufacturerDetails)
        },
        {
            header: 'Accounts Information',
            form: <SupplierManufacturerAccountsInformationForm
                supplierManufacturerDetails={supplierManufacturerDetails}
                updateParams={updateSupplierManufacturerParams}
                showErrors={maxStepSubmitted > 2}
            />,
            isComplete: isSupplierManufacturerAccountsInformationFormValid(supplierManufacturerDetails)
        },
        {
            header: 'Review Information',
            form: <>
                <SupplierManufacturerInformationDetails
                    supplierManufacturerData={supplierManufacturerPreviewData}
                    isPreview
                />
                <hr/>
                <SupplierManufacturerContactInformation
                    supplierManufacturerData={supplierManufacturerPreviewData}
                />
                <hr/>
                <SupplierManufacturerAccountsInformation
                    supplierManufacturerData={supplierManufacturerPreviewData}
                />
            </>,
            isComplete: true
        },        
    ];

    return (
        <>
            <SupplierManufacturerNavigation
                location="suppliers_manufacturers"
            />
            <OuterContainer
                title='Create Supplier/Manufacturer'
                description="Complete this form to create a supplier/manufacturer."
                maxWidth={1000}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Supplier/Manufacturer"
                    isCreating={isCreating}
                    createFunc={createSupplierManufacturer}
                />
            </OuterContainer>
        </>
    )
}

export default CreateSupplierManufacturerPage