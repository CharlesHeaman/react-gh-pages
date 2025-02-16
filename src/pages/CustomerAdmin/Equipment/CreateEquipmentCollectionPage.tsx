import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { CreateEquipmentCollectionAttributes } from "../../../types/equipment.types";
import { SiteResponseData } from "../../../types/sites.types";
import getAPI from "../../../utils/getAPI";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import SelectEquipmentEquipmentTypes from "./components/SelectEquipmentEquipmentTypes";
import EquipmentSiteDepartmentForm from "./CreateEquipment/components/EquipmentSiteDepartmentForm";
import isEquipmentSiteDepartmentFormValid from "./CreateEquipment/utils/isEquipmentSiteDepartmentFormValid";
import EquipmentList from "./components/EquipmentList";
import PreviewCreateEquipmentCollection from "./components/PreviewCreateEquipmentCollection";

const CreateEquipmentCollectionPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const stepParam = searchParams.get('step');
    const currentStep = parseInt(stepParam ? stepParam : '1');
    const customerIDParam = searchParams.get('customer_id');
    const siteIDParam = searchParams.get('site_id');
    const refrigerantIDParam = searchParams.get('refrigerant_id');
    const supplierIDParam = searchParams.get('supplier_id');
    const locationParam = searchParams.get('location');
    const descriptionParam = searchParams.get('description');
    const modelNumberParam = searchParams.get('model_number');
    const serialNumberParam = searchParams.get('serial_number');
    const gasCouncilNumberParam = searchParams.get('gas_council_number');

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [equipmentTypes, setEquipmentTypes] = useState<Array<CreateEquipmentCollectionAttributes>>([]);

    useEffect(() => {
        siteData?.data.customer_id && getCustomer(siteData.data.customer_id);
    }, [siteData?.data.customer_id])

    useEffect(() => {
        siteData?.data.department_id && getDepartment(siteData.data.department_id);
    }, [siteData?.data.department_id])

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam]);

    useEffect(() => {
        siteIDParam && getSite(parseInt(siteIDParam));
    }, [siteIDParam]);

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
        }, setIsSiteLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const createEquipment = () => {
        // postAPI('equipment/create', {}, {
        //     ...equipmentDetails,
        //     site_id: siteData?.id,
        //     department_id: departmentData?.id,
        //     equipment_type_id: equipmentTypeData ? equipmentTypeData.id : 0,
        //     refrigerant_id: refrigerantData ? refrigerantData.id : 0,
        //     supplier_id: supplierData ? supplierData.id : 0,
        //     manufacturer_id: manufacturerData ? manufacturerData.id : 0,
        //     f_gas_type: selectedFGasType,
        // }, (response: any) => {
        //     const equipmentData: EquipmentResponseData = response.data;
        //     navigate(`../${equipmentData.data.code}`, { relative: 'path' })
        // }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Site/Department',
            form: <EquipmentSiteDepartmentForm 
                    selectedCustomer={customerData}
                    setSelectedCustomer={setCustomerData}
                    selectedSite={siteData}
                    setSelectedSite={setSiteData}
                    selectedDepartment={departmentData}
                    setSelectedDepartment={setDepartmentData}
                    showErrors={maxStepSubmitted > 0}   
                />,
            isComplete: isEquipmentSiteDepartmentFormValid(siteData?.id, departmentData?.id)
        },
        {
            header: 'Select Equipment Types',
            form: departmentData ? <SelectEquipmentEquipmentTypes
                departmentID={departmentData.id}
                equipmentTypes={equipmentTypes}
                setEquipmentTypes={setEquipmentTypes}
            /> : null,
            isComplete: true
        },
        {
            header: 'Review Information',
            form: siteData ? <PreviewCreateEquipmentCollection
                site={siteData}
                equipmentTypes={equipmentTypes}
            /> : null,
            isComplete: true
        }
    ]

    return (
        <>
            <CustomerAdminNavigation location="equipment"/>
            <OuterContainer
                title='Create Equipment collection'
                description="Complete this form to create a collection of equipment."
                maxWidth={1000}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Equipment"
                    isCreating={isCreating}
                    createFunc={createEquipment}
                />
            </OuterContainer>
        </>
    )
}

export default CreateEquipmentCollectionPage