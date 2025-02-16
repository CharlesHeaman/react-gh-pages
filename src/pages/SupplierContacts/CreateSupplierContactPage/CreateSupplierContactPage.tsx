import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { CreateSupplierContactAttributes, SupplierContactResponseData } from "../../../types/supplierContact.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import isContactDetailsFormValid from "../../CustomerAdmin/Contacts/CreateContact/utils/isContactDetailsFormValid";
import isSelectSiteCustomerFormValid from "../../CustomerAdmin/Contacts/CreateContact/utils/isSelectSiteCustomerFormValid";
import SupplierManufacturerNavigation from "../../SuppliersManufacturers/components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import SupplierContactInformation from "../SupplierContactPage/components/SupplierContactInformation";
import SupplierContactInformationSkeleton from "../SupplierContactPage/components/SupplierContactInformationSkeleton";
import SupplierContactDetailsForm from "./components/SupplierContactDetailsForm";
import SupplierContactSelectSupplierManufacturer from "./components/SupplierContactSelectSupplierManufacturer";

const CreateSupplierContactPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [contactDetails, setContactDetails] = useState<CreateSupplierContactAttributes>({
        name: '',
        email: '',
        mobile: '',
        telephone: '',
        notes: ''
    });
    const [, setIsSupplierLoading] = useState(true);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();

    const supplierManufacturerIDParam = searchParams.get('supplier_manufacturer_id');

    useEffect(() => {
        supplierManufacturerIDParam && getSupplierManufacturer(parseInt(supplierManufacturerIDParam));
    }, [supplierManufacturerIDParam])

    const getSupplierManufacturer = (supplierManufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${supplierManufacturerID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setContactDetails)
    }

    const createContact = () => {
        postAPI('supplier_contacts/create', {}, {
            ...contactDetails,
            supplier_manufacturer_id: supplierData?.id
        }, (response: any) => {
            const contactData: SupplierContactResponseData = response.data;
            navigate(`../${contactData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Select Supplier/Manufacturer',
            form: <SupplierContactSelectSupplierManufacturer 
                selectedSupplier={supplierData} 
                setSelectedCSupplier={setSupplierData} 
                contactDetails={contactDetails} 
                updateParams={updateParams} 
                showErrors={maxStepSubmitted > 0}            
            />,
            isComplete: isSelectSiteCustomerFormValid(supplierData?.id)
        },
        {
            header: 'Contact Details',
            form: <SupplierContactDetailsForm
                    contactDetails={contactDetails}
                    updateParams={updateParams}
                    showErrors={maxStepSubmitted > 1}
                />, 
            isComplete: isContactDetailsFormValid(contactDetails)
        },
        {
            header: 'Review Information',
            form: supplierData ?
                <SupplierContactInformation 
                    supplierContactData={{
                        ...contactDetails,
                        supplier_manufacturer_id: supplierData.id,
                        is_active: true,
                    }}
                    supplier={supplierData}
                    isPreview
                />  :
                <SupplierContactInformationSkeleton/>
                ,
            isComplete: true
        }, 
    ]

    return (
        <>
            <SupplierManufacturerNavigation
                location="supplier_contacts"
            />
            <OuterContainer
                title='Create Supplier/Manufacturer Contact'
                description="Complete this form to create a supplier/manufacturer."
                maxWidth={900}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Contact"
                    isCreating={isCreating}
                    createFunc={createContact}
                />
            </OuterContainer>
        </>
    )
}

export default CreateSupplierContactPage