import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreCollectionResponse, CostCentreResponseData } from "../../types/costCentres.types";
import { CustomerResponseData } from "../../types/customers.types";
import { CreateRequisitionAttributes, RequisitionResponseData } from "../../types/requisition.types";
import { UserResponseData } from "../../types/user.types";
import { VehicleResponseData } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import postAPI from "../../utils/postAPI";
import updateStateParams from "../../utils/updateStateParams/updateStateParams";
import RequisitionCostCentreForm from "./components/RequisitionCostCentreForm";
import RequisitionDetailsForm from "./components/RequisitionDetailsForm";
import RequisitionInformationDetails from "./components/RequisitionInformationDetails";
import isRequisitionCostCentreFormValid from "./utils/isRequisitionCostCentreFormValid";
import isRequisitionDetailsFormValid from "./utils/isRequisitionDetailsFormValid";
import { TicketResponseData } from "../../types/tickets.types";
import { DepartmentResponseData } from "../../types/department.types";
import { QuoteResponseData } from "../../types/quote.types";

const CreateRequisitionPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [requisitionDetails, setRequisitionDetails] = useState<CreateRequisitionAttributes>({
        notes: ''
    });
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(false);  
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    const [selectedAssigned, setSelectedAssigned] = useState<UserResponseData>();
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData>();  
    const [isVehicleLoading, setIsVehicleLoading] = useState(false);  
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleResponseData>();    
    const [isTicketLoading, setIsTicketLoading] = useState(false);  
    const [selectedTicket, setSelectedTicket] = useState<TicketResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

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
            vehicleData.data.user_id && getAssignedUser(vehicleData.data.user_id);
        }, setIsVehicleLoading);
    }

    const getTicket = (ticketID: number, ticketType: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            getCostCentreByDepartmentResource(1, ticketData.data.department_id);
            setSelectedTicket(ticketData);
            if (ticketData.data.engineers[0]) getAssignedUser(ticketData.data.engineers[0].user_id);
        }, setIsTicketLoading);
    }

    const getJob = (jobID: number) => {
        getAPI(`quotes/${jobID}`, {}, (response: any) => {
            const jobData: QuoteResponseData = response.data;
            getCostCentreByDepartmentResource(2, jobData.data.department_id);
            setSelectedJob(jobData);
        }, setIsJobLoading);
    }

    const getAssignedUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setSelectedAssigned(userData);
        }, setIsUserLoading);
    }

    const getCostCentre = (costCentreID: number) => {
        getAPI(`cost_centres/${costCentreID}`, {}, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentreLoading);
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
        updateStateParams(event, setRequisitionDetails)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Cost Centre',
            form: <RequisitionCostCentreForm 
                selectedCostCentre={costCentreData} 
                setSelectedCostCentre={setCostCentreData} 
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isRequisitionCostCentreFormValid(costCentreData?.id)
        },
        {
            header: 'Requisition Details',
            form: <RequisitionDetailsForm
                requisitionDetails={requisitionDetails}
                costCentreData={costCentreData}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                selectedAssigned={selectedAssigned}
                setSelectedAssigned={setSelectedAssigned}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                updateParams={updateParams} 
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isRequisitionDetailsFormValid(costCentreData, selectedAssigned?.id, selectedCustomer?.id, selectedUser?.id, selectedVehicle?.id, selectedTicket?.id, selectedJob?.id)
        },
        {
            header: 'Review Information',
            form: selectedAssigned && costCentreData ? <>
                <RequisitionInformationDetails
                    notes={requisitionDetails.notes}
                    createdAt={new Date()}
                    engineer={selectedAssigned}
                    costCentre={costCentreData}
                    customerData={selectedCustomer}
                    userData={selectedUser}
                    vehicleData={selectedVehicle}
                    jobData={selectedJob}
                    ticketData={selectedTicket}
                    departmentData={departmentData}
                    isPreview
                />
            </> : undefined,
            isComplete: true
        },        
    ];

    const createRequisition = () => {
        postAPI('requisitions/create', {}, {
            ...requisitionDetails,
            recipient_id: selectedAssigned?.id,
            cost_centre_id: costCentreData?.id,
            customer_id: selectedCustomer?.id,
            user_id: selectedUser?.id,
            vehicle_id: selectedVehicle?.id,
            department_id: selectedTicket ? selectedTicket.data.department_id : selectedJob ? selectedJob.data.department_id : undefined,
            ticket_number: selectedTicket?.data.number,
            job_number: selectedJob?.data.number
        }, (response: any) => {
            const requisitionData: RequisitionResponseData = response.data;
            navigate(`../${requisitionData.data.number}`, { relative: 'path'})
        }, setIsCreating)
    }

    return (
        <OuterContainer
            title='Create Requisition'
            description='Complete this form to create a new requisition.'
            maxWidth={750}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Requisition"
                isCreating={isCreating}
                createFunc={createRequisition}
            />
        </OuterContainer>
    )
}

export default CreateRequisitionPage