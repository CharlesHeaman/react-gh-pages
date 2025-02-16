import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreResponseData } from "../../types/costCentres.types";
import { CustomerResponseData } from "../../types/customers.types";
import { RequisitionCollectionResponse, RequisitionResponseData } from "../../types/requisition.types";
import { RequisitionLineCollectionResponse } from "../../types/requisitionLines.types";
import { UserResponseData } from "../../types/user.types";
import { VehicleResponseData } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import RequisitionInformation from "./components/RequisitionInformation";
import RequisitionSideBar from "./components/RequisitionSideBar";
import RequisitionInformationSkeleton from "./components/RequisitionInformationSkeleton";
import Label from "../../components/ui/General/Label/Label";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import AssociatedResourceTypeLabel from "../CostCentres/utils/AssociatedResourceTypeLabel";
import { RequisitionActivityCollectionResponse, RequisitionActivityResponseData } from "../../types/requisitionActivity.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import { DepartmentResponseData } from "../../types/department.types";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";

const RequisitionPage = ()  => {
    const { requisitionNumber } = useParams();

    // Data States 
    const [isRequisitionLoading, setIsRequisitionLoading] = useState(true);
    const [requisitionData, setRequisitionData] = useState<RequisitionResponseData>();
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(true);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();
    const [isEngineerLoading, setIsEngineerLoading] = useState(true);
    const [engineerData, setEngineerData] = useState<UserResponseData>();
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(true);
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isVehicleLoading, setIsVehicleLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleResponseData>();
    const [isCompleteActivityLoading, setIsCompleteActivityLoading] = useState(false);
    const [completeActivityData, setCompleteActivityData] = useState<RequisitionActivityResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getRequisitionData();
        getRequisitionLines();
    }, [requisitionNumber]);

    useEffect(() => {
        if (requisitionData === undefined) return;
        if (requisitionData.data.is_complete) getCompleteActivity(requisitionData.id);
    }, [JSON.stringify(requisitionData)]);

    const getRequisitionData = () => {
        getAPI('requisitions', {
            numbers: [requisitionNumber]
        }, (response: any) => {
            const requisitionCollectionData: RequisitionCollectionResponse = response.data;
            const requisitionData = requisitionCollectionData.data[0];
            setRequisitionData(requisitionData);
            getEngineer(requisitionData.data.recipient_id);
            getCostCentre(requisitionData.data.cost_centre_id);
            requisitionData.data.customer_id && getCustomer(requisitionData.data.customer_id);
            requisitionData.data.user_id && getUser(requisitionData.data.user_id);
            requisitionData.data.vehicle_id && getVehicle(requisitionData.data.vehicle_id);
            requisitionData.data.ticket_number && requisitionData.data.department_id && getTicket(requisitionData.data.ticket_number, requisitionData.data.department_id);
            requisitionData.data.job_number && requisitionData.data.department_id && getJob(requisitionData.data.job_number, requisitionData.data.department_id);
            requisitionData.data.department_id && getDepartment(requisitionData.data.department_id);
        }, setIsRequisitionLoading);
    }

    const getRequisitionLines = () => {
        getAPI('requisition_lines', {
            requisition_numbers: [requisitionNumber]
        }, (response: any) => {
            const requisitionLines: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLines);
        }, setIsRequisitionLinesLoading);
    }

    const getEngineer = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setEngineerData(userData);
        }, setIsEngineerLoading);
    }

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getCostCentre = (costCentreID: number) => {
        getAPI(`cost_centres/${costCentreID}`, {}, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentreLoading);
    }

    const getTicket = (ticketNumber: number, departmentID: number,) => {
        getAPI(`tickets`, {
            numbers: [ticketNumber],
            department_ids: [departmentID]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data[0]);
        }, setIsTicketLoading);
    }

    const getJob = (jobNumber: number, departmentID: number,) => {
        getAPI(`quotes`, {
            number: jobNumber,
            department_id: departmentID
        }, (response: any) => {
            const jobData: QuoteCollectionResponse = response.data;
            setJobData(jobData.data[0]);
        }, setIsJobLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getVehicle = (vehicleID: number) => {
        getAPI(`vehicles/${vehicleID}`, {}, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading);
    }

    const getCompleteActivity = (requisitionID: number) => {
        getAPI(`requisition_activity`, {
            requisition_id: requisitionID,
            type: 4,
            perPage: 1
        }, (response: any) => {
            const requisitionActivityData: RequisitionActivityCollectionResponse = response.data;
            setCompleteActivityData(requisitionActivityData.data[0]);
        }, setIsCompleteActivityLoading)    
    }

    const isLoading = (
        isRequisitionLoading || 
        isEngineerLoading || 
        isRequisitionLinesLoading || 
        isCostCentreLoading || 
        isCustomerLoading || 
        isVehicleLoading || 
        isTicketLoading || 
        isJobLoading || 
        isDepartmentLoading ||
        isUserLoading || 
        isCompleteActivityLoading
    )
    
    const isHeaderLoading = (
        isRequisitionLoading || 
        isCostCentreLoading
    )

    return (
        <OuterContainer
            title='Requisition'
            id={requisitionNumber}
            maxWidth={1400}
            headerContent={!isHeaderLoading && requisitionData && costCentreData ? 
                <div className="flex">
                    {requisitionData.data.is_complete ?
                        <Label text="Complete" iconFont="assignment_turned_in" color="dark-blue"/> :
                        <Label text="Pending" iconFont="pending" color="light-blue"/> 
                    }
                    <AssociatedResourceTypeLabel resourceType={costCentreData.data.associated_resource_type}/>
                </div> :
                <div className="flex">
                    <Skeleton type="label"/>
                    <Skeleton type="label"/>
                </div>
            }
            bigID
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && requisitionData && engineerData && requisitionLinesData && costCentreData ?
                        <RequisitionInformation
                            requisitionID={requisitionData.id}
                            requisitionData={requisitionData.data}
                            engineer={engineerData}
                            requisitionLines={requisitionLinesData}
                            costCentre={costCentreData}
                            customerData={customerData}
                            userData={userData}
                            vehicleData={vehicleData}
                            jobData={jobData}
                            ticketData={ticketData}
                            departmentData={departmentData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}  
                            setRequisitionLinesData={setRequisitionLinesData} 
                            completeAt={completeActivityData?.data.created_at} 
                        /> 
                        :
                        <RequisitionInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <RequisitionSideBar
                        requisition={requisitionData}
                        requisitionLines={requisitionLinesData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        setRequisitionData={setRequisitionData}
                    />
                </div>
            </div>
        </OuterContainer>
    )
}

export default RequisitionPage