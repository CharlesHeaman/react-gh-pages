import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText";
import { CostCentreCollectionResponse, CostCentreResponseData } from "../../../types/costCentres.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { CreatePurchaseOrderAttributes, PurchaseOrderResponseData } from "../../../types/purchaseOrder.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import { TicketResponseData } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import { VehicleResponseData } from "../../../types/vehicles.types";
import getAPI from "../../../utils/getAPI";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import postAPI from "../../../utils/postAPI";
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import PurchaseOrderInformationDetails from "../../Requisitions/components/PurchaseOrderInformationDetails";
import PurchaseOrderAccountsInformationForm from "./components/PurchaseOrderAccountsInformationForm";
import PurchaseOrderDetailsForm from "./components/PurchaseOrderDetailsForm";
import PurchaseOrderSupplierDetailsForm from "./components/PurchaseOrderSupplierDetailsForm";
import isPurchaseOrderCostCentreFormValid from "./utils/isPurchaseOrderCostCentreFormValid";
import isPurchaseOrderDetailsFormValid from "./utils/isPurchaseOrderDetailsFormValid";
import isPurchaseOrderSupplierInformationFormValid from "./utils/isPurchaseOrderSupplierInformationFormValid";
import { QuoteResponseData } from "../../../types/quote.types";


const CreatePurchaseOrderPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState<CreatePurchaseOrderAttributes>({
        delivery_date: getDayRelativeDate(new Date(), 1),
        special_instructions: ''
    });
    const [selectedPaymentType, setSelectedPaymentType] = useState(2);
    const [selectedDispatchByType, setSelectedDispatchByType] = useState(3);
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(false);  
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);  
    const [selectedAssignedCustomer, setSelectedAssignedCustomer] = useState<CustomerResponseData>();
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData>();    
    const [isVehicleLoading, setIsVehicleLoading] = useState(false);  
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleResponseData>();    
    const [isTicketLoading, setIsTicketLoading] = useState(false);  
    const [selectedTicket, setSelectedTicket] = useState<TicketResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();

    const vehicleIDParam = searchParams.get('vehicle_id');

    useEffect(() => {
        vehicleIDParam && getVehicle(parseInt(vehicleIDParam));
    }, [vehicleIDParam]);

    const ticketIDParam = searchParams.get('ticket_id');
    const ticketTypeParam = searchParams.get('ticket_type');

    useEffect(() => {
        ticketIDParam && ticketTypeParam && getTicket(parseInt(ticketIDParam), parseInt(ticketTypeParam));
    }, [ticketIDParam, ticketTypeParam]);

    const jobIDParam = searchParams.get('job_id');

    useEffect(() => {
        jobIDParam && getJob(parseInt(jobIDParam));
    }, [jobIDParam]);

    useEffect(() => {
        if (selectedTicket === undefined) return;
        getDepartment(selectedTicket.data.department_id);
    }, [selectedTicket?.data.department_id]);

    useEffect(() => {
        if (selectedJob === undefined) return;
        getDepartment(selectedJob.data.department_id);
    }, [selectedJob?.data.department_id]);

    const getVehicle = (vehicleID: number) => {
        getAPI(`vehicles/${vehicleID}`, {}, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            getCostCentre(vehicleData.data.cost_centre_id);
            setSelectedVehicle(vehicleData);
        }, setIsVehicleLoading);
    }

    const getTicket = (ticketID: number, ticketType: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            getCostCentreByDepartmentResource(1, ticketData.data.department_id);
            setSelectedTicket(ticketData);
            getCustomer(ticketData.data.customer_id);
        }, setIsTicketLoading);
    }

    const getJob = (jobID: number) => {
        getAPI(`quotes/${jobID}`, {}, (response: any) => {
            const jobData: QuoteResponseData = response.data;
            getCostCentreByDepartmentResource(2, jobData.data.department_id);
            getCustomer(jobData.data.customer_id);
            setSelectedJob(jobData);
        }, setIsJobLoading);
    }

    const getCostCentre = (costCentreID: number) => {
        getAPI(`cost_centres/${costCentreID}`, {}, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentreLoading);
    }

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setSelectedAssignedCustomer(customerData);
        }, setIsCustomerLoading);
    }

    const getCostCentreByDepartmentResource = (associatedResourceType: number, departmentID: number) => {
        getAPI('cost_centres', {
            associated_resource_type: associatedResourceType,
            department_id: departmentID
        }, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentreData(costCentreData.data[0]);
        }, setIsCostCentreLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setPurchaseOrderDetails)
    }

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setPurchaseOrderDetails)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Accounts Information',
            form: <PurchaseOrderAccountsInformationForm 
                purchaseOrderDetails={purchaseOrderDetails}
                selectedCostCentre={costCentreData} 
                setSelectedCostCentre={setCostCentreData} 
                selectedPaymentType={selectedPaymentType}
                setSelectedPaymentType={setSelectedPaymentType}
                updateParams={updateParams} 
                showErrors={maxStepSubmitted > 0}
                
            />,
            isComplete: isPurchaseOrderCostCentreFormValid(costCentreData?.id)
        },
        {
            header: 'Purchase Order Details',
            form: <PurchaseOrderDetailsForm
                costCentreData={costCentreData}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                selectedAssignedCustomer={selectedAssignedCustomer}
                setSelectedAssignedCustomer={setSelectedAssignedCustomer}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isPurchaseOrderDetailsFormValid(costCentreData, selectedAssignedCustomer?.id, selectedCustomer?.id, selectedUser?.id, selectedVehicle?.id, selectedTicket?.id, selectedJob?.id)
        },
        {
            header: 'Supplier Information',
            form: <PurchaseOrderSupplierDetailsForm
                purchaseOrderDetails={purchaseOrderDetails}
                selectedSupplier={supplierData}
                setSelectedSupplier={setSupplierData}
                selectedDispatchBy={selectedDispatchByType}
                setSelectedDispatchBy={setSelectedDispatchByType}
                updateParams={updateParams} 
                updateDateParams={updateDateParams}
                showErrors={maxStepSubmitted > 2}
            />, 
            isComplete: isPurchaseOrderSupplierInformationFormValid(supplierData?.id, supplierData?.data.is_approved)
        },
        {
            header: 'Review Information',
            form: costCentreData && selectedAssignedCustomer && supplierData ? <>
                {supplierData && !supplierData.data.is_approved ? <section>
                    <InnerContainer 
                        color={supplierData.data.is_approved === null ? 'orange' : 'red'}
                    > 
                        <IconTitleText
                            iconFont="report_problem"
                            title={`Supplier is ${supplierData.data.is_approved === null ? 'Pending Approval' : 'Not Approved'}`}
                            text={`The selected supplier ${supplierData.data.is_approved === null ? 'is still pending approval' : 'has been marked as not approved'}.`}
                            color={supplierData.data.is_approved === null ? 'orange' : 'red'}
                        />
                    </InnerContainer>
                </section> : null}
                <PurchaseOrderInformationDetails
                    purchaseOrderData={{
                        ...purchaseOrderDetails,
                        created_by_id: 0,
                        created_at: new Date(),
                        supplier_id: 0,
                        assigned_customer_id: 0,
                        cost_centre_id: 0,
                        is_outstanding: true,
                        payment_type: selectedPaymentType,
                        sent_by_id: null,
                        sent_at: null,
                        vehicle_id: 0,
                        has_received: false,
                        dispatch_by_type: selectedDispatchByType
                    }}
                    supplier={supplierData}
                    assignedCustomer={selectedAssignedCustomer}
                    customerData={selectedCustomer}
                    costCentre={costCentreData}
                    userData={selectedUser}
                    vehicleData={selectedVehicle}
                    ticketData={selectedTicket}
                    departmentData={departmentData}
                    jobData={selectedJob}
                    isPreview
                />
            </> : null,
            isComplete: true
        },        
    ];

    const createPurchaseOrder = () => {
        postAPI('purchase_orders/create', {}, {
            ...purchaseOrderDetails,
            cost_centre_id: costCentreData?.id,
            supplier_id: supplierData?.id,
            assigned_customer_id: selectedAssignedCustomer?.id,
            customer_id: selectedCustomer?.id,
            user_id: selectedUser?.id,
            vehicle_id: selectedVehicle?.id,
            department_id: selectedTicket ? selectedTicket.data.department_id : selectedJob ? selectedJob.data.department_id : undefined,
            ticket_number: selectedTicket?.data.number,
            job_number: selectedJob?.data.number,
            payment_type: selectedPaymentType,
            dispatch_by_type: selectedDispatchByType
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderResponseData = response.data;
            navigate(`../${purchaseOrderData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    return (
        <OuterContainer
            title='Create Purchase Order'
            description='Complete this form to create a new purchase order.'
            maxWidth={1000}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Purchase Order"
                isCreating={isCreating}
                createFunc={createPurchaseOrder}
            />
        </OuterContainer>
    )
}

export default CreatePurchaseOrderPage