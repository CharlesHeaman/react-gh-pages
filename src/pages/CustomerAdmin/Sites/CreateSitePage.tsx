import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { Coordinates, CreateSiteAttributes, SiteResponseData } from "../../../types/sites.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import SiteCustomerDepartmentForm from "./CreateSite/components/SiteCustomerDepartmentForm";
import SiteDetailsForm from "./CreateSite/components/SiteDetailsForm";
import SiteLocationForm from "./CreateSite/components/SiteLocationForm";
import isSiteCustomerDepartmentFormValid from "./CreateSite/utils/isSiteCustomerDepartmentFormValid";
import isSiteDetailsFormValid from "./CreateSite/utils/isSiteDetailsFormValid";
import SiteCustomerInformation from "./SitePage/components/SiteCustomerInformation";
import SiteInformationDetails from "./SitePage/components/SiteInformationDetails";
import SiteInformationSkeleton from "./SitePage/components/SiteInformationSkeleton";
import SiteLocationInformation from "./SitePage/components/SiteLocationInformation";
import checkUniqueSiteCode from "./utils/checkUniqueSiteCode";
import isSiteLocationFormValid from "./CreateSite/utils/isSiteLocationFormValis";

const CreateSitePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [siteDetails, setSiteDetails] = useState<CreateSiteAttributes>({
        name: '',
        code: '',
        location: '',
        description: '',
        address: '',
        postcode: '',
        telephone: '',
        special_instructions: '',
        coordinates: {
            lat: 0,
            lng: 0
        }
    });
    const [, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>()
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(false);

    const customerIDParam = searchParams.get('customer_id');

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam])

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const updateSiteParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSiteDetails)
    }

    const updateCoordinates = (coordinates: Coordinates) => {
        setSiteDetails((prevState: any) => {
            return {
                ...prevState, 
                coordinates: coordinates
            }
        });
    }

    useEffect(() => {
        if (customerData === undefined) return;
        setSiteDetails(prevState => {
            return {
                ...prevState, 
                address: customerData.data.address,
                postcode: customerData.data.postcode,
                telephone: customerData.data.telephone
            }
        })
    }, [customerData?.id]);

    const createSite = () => {
        postAPI('sites/create', {}, {
            ...siteDetails,
            customer_id: customerData?.id,
            department_id: departmentData?.id
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            navigate(`../${siteData.data.code}`, { relative: 'path' })
        }, setIsCreating)
    }

    const siteData = {
        ...siteDetails,
        customer_id: 0,
        department_id: 0,
        is_active: true,
        contract_id: 0,
        last_maintenance_at: new Date(),
        next_maintenance_at: new Date()
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Select Customer',
            form: <SiteCustomerDepartmentForm
                    selectedCustomer={customerData}
                    setSelectedCustomer={setCustomerData}
                    siteDetails={siteDetails}
                    updateParams={updateSiteParams}
                    showErrors={maxStepSubmitted > 0}
                />,
            isComplete: isSiteCustomerDepartmentFormValid(customerData?.id)
        },
        {
            header: 'Site Details',
            form: <SiteDetailsForm
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                siteDetails={siteDetails}
                updateParams={updateSiteParams}
                siteCodeUnique={codeUnique}
                checkUniqueSiteCode={() => checkUniqueSiteCode(siteDetails.code, setCodeUnique, setIsCodeLoading)}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isSiteDetailsFormValid(siteDetails, codeUnique, departmentData?.id)
        },
        {
            header: 'Location Information',
            form: <SiteLocationForm
                siteDetails={siteDetails}
                updateParams={updateSiteParams}
                updateCoordinates={updateCoordinates}
                showErrors={maxStepSubmitted > 2}
            />,
            isComplete: isSiteLocationFormValid(siteDetails)
        },
        {
            header: 'Review Information',
            form: customerData && departmentData ? <>
                <SiteInformationDetails
                    siteData={siteData}
                    department={departmentData}
                    isPreview
                />
                <hr/>
                <SiteLocationInformation
                    siteData={siteData}
                    isPreview
                />
                <hr/>
                <SiteCustomerInformation
                    customer={customerData}
                    contract={undefined}
                    isPreview
                />
                </> :
                <SiteInformationSkeleton/>,
            isComplete: true
        },        
    ];

    return (
        <>
            <CustomerAdminNavigation location="sites"/>
            <OuterContainer
                title='Create Site'
                description="Complete this form to create a site."
                maxWidth={900}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Site"
                    isCreating={isCreating}
                    createFunc={createSite}
                />
            </OuterContainer>
        </>
    )
}

export default CreateSitePage