import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { CreateEquipmentAttributes, EquipmentResponseData } from "../../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import { SiteResponseData } from "../../../types/sites.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import EquipmentInformation from "../../Equipment/components/EquipmentInformation";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import EquipmentInformationSkeleton from "./components/EquipmentInformationSkeleton";
import EquipmentDetailsForm from "./CreateEquipment/components/EquipmentDetailsForm";
import EquipmentGasDetailsForm from "./CreateEquipment/components/EquipmentGasDetailsForm";
import EquipmentOilDetailsForm from "./CreateEquipment/components/EquipmentOilDetailsForm";
import EquipmentRefrigerantDetailsForm from "./CreateEquipment/components/EquipmentRefrigerantDetailsForm";
import EquipmentSiteDepartmentForm from "./CreateEquipment/components/EquipmentSiteDepartmentForm";
import EquipmentSupplierManufacturerForm from "./CreateEquipment/components/EquipmentSupplierManufacturererForm";
import isEquipmentDetailsFormValid from "./CreateEquipment/utils/isEquipmentDetailsFormValid";
import isEquipmentGasDetailsFormValid from "./CreateEquipment/utils/isEquipmentGasDetailsFormValid";
import isEquipmentOilDetailsFormValid from "./CreateEquipment/utils/isEquipmentOilFormValid";
import isEquipmentRefrigerantDetailsFormValid from "./CreateEquipment/utils/isEquipmentRefrigerantDetailsFormValid";
import isEquipmentSiteDepartmentFormValid from "./CreateEquipment/utils/isEquipmentSiteDepartmentFormValid";
import isEquipmentSupplierManufacturerFormValid from "./CreateEquipment/utils/isEquipmentSupplierManufacturerFormValid";
import checkUniqueEquipmentCode from "./utils/checkUniqueEquipmentCode";

const CreateEquipmentPage = () => {
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
    const [equipmentDetails, setEquipmentDetails] = useState<CreateEquipmentAttributes>({
        code: '',
        location: locationParam ? locationParam : '',
        description: descriptionParam ? descriptionParam : '',
        notes: '',
        internal_notes: '',
        model_number: modelNumberParam ? modelNumberParam : '',
        serial_number: serialNumberParam ? serialNumberParam : '',
        model_number_2: '',
        serial_number_2: '',
        refrigerant_charge: '0',
        is_leak_detection_fitted: false,
        is_hermetically_sealed: false,
        fuel_type: 0,
        gas_council_number: gasCouncilNumberParam ? gasCouncilNumberParam : '',
        nozzle: '',
        pump: '',
    });
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(false);
    const [selectedFGasType, setSelectedFGasType] = useState(0);

    const equipmentTypeSelected = (equipmentTypeData !== undefined && currentStep > 2);

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

    useEffect(() => {
        refrigerantIDParam && getRefrigerant(parseInt(refrigerantIDParam));
    }, [refrigerantIDParam]);

    useEffect(() => {
        supplierIDParam && getSupplier(parseInt(supplierIDParam));
    }, [supplierIDParam]);

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

    const getRefrigerant = (refrigerantID: number) => {
        getAPI(`refrigerants/${refrigerantID}`, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getSupplier = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const updateEquipmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setEquipmentDetails)
    }

    const updateEquipmentCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setEquipmentDetails)
    }

    const createEquipment = () => {
        postAPI('equipment/create', {}, {
            ...equipmentDetails,
            site_id: siteData?.id,
            department_id: departmentData?.id,
            equipment_type_id: equipmentTypeData ? equipmentTypeData.id : 0,
            refrigerant_id: refrigerantData ? refrigerantData.id : 0,
            supplier_id: supplierData ? supplierData.id : 0,
            manufacturer_id: manufacturerData ? manufacturerData.id : 0,
            f_gas_type: selectedFGasType,
        }, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            navigate(`../${equipmentData.data.code}`, { relative: 'path' })
        }, setIsCreating)
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
            header: 'Equipment Details',
            form: <EquipmentDetailsForm
                    selectedEquipmentType={equipmentTypeData}
                    setSelectedEquipmentType={setEquipmentTypeData}
                    equipmentDetails={equipmentDetails}
                    departmentID={departmentData?.id}
                    updateParams={updateEquipmentParams} 
                    equipmentCodeUnique={codeUnique}
                    checkUniqueEquipmentCode={() => checkUniqueEquipmentCode(equipmentDetails.code, setCodeUnique, setIsCodeLoading)}
                    showErrors={maxStepSubmitted > 1}            
                />,
            isComplete: isEquipmentDetailsFormValid(equipmentDetails, codeUnique, equipmentTypeData?.id)
        },
        {
            header: 'Supplier/Manufacturer Information',
            form: <EquipmentSupplierManufacturerForm
                    selectedSupplier={supplierData}
                    setSelectedSupplier={setSupplierData}
                    selectedManufacturer={manufacturerData}
                    setSelectedManufacturer={setManufacturerData}
                    equipmentDetails={equipmentDetails}
                    setSupplierData={setSupplierData}
                    setManufacturerData={setManufacturerData}
                    updateParams={updateEquipmentParams} 
                    showErrors={maxStepSubmitted > 2}
                />,
            isComplete: isEquipmentSupplierManufacturerFormValid(equipmentDetails)
        }
    ]

    if (equipmentTypeSelected) {
        equipmentTypeData.data.energy_source === 0 && formSteps.push({
            header: 'Refrigerant Details',
            form: <EquipmentRefrigerantDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    selectedRefrigerant={refrigerantData}
                    setSelectedRefrigerant={setRefrigerantData}
                    selectedFGasType={selectedFGasType}
                    setSelectedFGasType={setSelectedFGasType}
                    updateParams={updateEquipmentParams} 
                    updateCheckboxParams={updateEquipmentCheckboxParams}
                    showErrors={maxStepSubmitted > 3}
                />,
            isComplete: isEquipmentRefrigerantDetailsFormValid(equipmentDetails, refrigerantData?.id)
        })
        equipmentTypeData.data.energy_source === 1 && formSteps.push({
            header: 'Gas Details',
            form: <EquipmentGasDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    updateParams={updateEquipmentParams} 
                    showErrors={maxStepSubmitted > 3}              
                />,
            isComplete: isEquipmentGasDetailsFormValid(equipmentDetails)
        })
        equipmentTypeData.data.energy_source === 2 && formSteps.push({
            header: 'Oil Details',
            form: <EquipmentOilDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    updateParams={updateEquipmentParams} 
                    showErrors={maxStepSubmitted > 3}              
                />,
            isComplete: isEquipmentOilDetailsFormValid(equipmentDetails)
        })
        formSteps.push({
            header: 'Review Information',
            form: departmentData && customerData && siteData ?
                <EquipmentInformation 
                    departmentData={departmentData} 
                    equipmentData={{
                        ...equipmentDetails,
                        site_id: siteData.id,
                        department_id: departmentData.id,
                        refrigerant_id: refrigerantData ? refrigerantData.id : null,
                        equipment_type_id: equipmentTypeData ? equipmentTypeData.id : null,
                        supplier_id: supplierData ? supplierData.id : null,
                        manufacturer_id: manufacturerData ? manufacturerData.id : null,
                        is_active: true,
                        f_gas_type: selectedFGasType,
                        fuel_type: parseInt(equipmentDetails.fuel_type.toString()),
                        refrigerant_charge: parseFloat(equipmentDetails.refrigerant_charge),
                        created_at: new Date(),
                        created_by_id: 0,
                        last_service_at: new Date(),
                        next_service_at: new Date(),
                        master_equipment_id: 0,
                        install_date: new Date(),
                    }} 
                    customerData={customerData} 
                    site={siteData} 
                    refrigerant={refrigerantData} 
                    supplier={supplierData} 
                    manufacturer={manufacturerData} 
                    equipmentTypeData={equipmentTypeData}
                    master={undefined}     
                    lastDeactivate={new Date()}
                    isPreview
                /> : 
                <EquipmentInformationSkeleton/>
            ,
            isComplete: true
        })
    }

    return (
        <>
            <CustomerAdminNavigation location="equipment"/>
            <OuterContainer
                title='Create Equipment'
                description="Complete this form to create an equipment."
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

export default CreateEquipmentPage