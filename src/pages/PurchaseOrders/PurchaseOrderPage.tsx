import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import { PurchaseOrderLineCollectionResponse } from "../../types/PurchaseOrderLines.types";
import { CostCentreResponseData } from "../../types/costCentres.types";
import { CustomerResponseData } from "../../types/customers.types";
import { PurchaseOrderResponseData } from "../../types/purchaseOrder.types";
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types";
import getAPI from "../../utils/getAPI";
import PurchaseOrderInformation from "./components/PurchaseOrderInformation";
import PurchaseOrderInformationSkeleton from "./components/PurchaseOrderInformationSkeleton";
import PurchaseOrderSideBar from "./components/PurchaseOrderSideBar";
import PurchaseOrderStatusLabel from "./components/PurchaseOrderStatusLabel";
import { PurchaseOrderAttachmentCollectionResponse, PurchaseOrderAttachmentResponseData } from "../../types/purchaseOrderAttachments.types";
import { UserResponseData } from "../../types/user.types";
import { VehicleResponseData } from "../../types/vehicles.types";
import AssociatedResourceTypeLabel from "../CostCentres/utils/AssociatedResourceTypeLabel";
import { PurchaseOrderActivityCollectionResponse, PurchaseOrderActivityResponseData } from "../../types/purchaseOrderActivity.types";
import { DepartmentResponseData } from "../../types/department.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import PurchaseOrderAccountsStatusLabel from "./components/PurchaseOrderAccountsStatusLabel";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";

const PurchaseOrderPage = ()  => {
    const { purchaseOrderID } = useParams();

    // Data States
    const [isPurchaseOrderLoading, setIsPurchaseOrderLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderResponseData>();
    const [isAssignedCustomerLoading, setIsAssignedCustomerLoading] = useState(true);
    const [assignedCustomerData, setAssignedCustomerData] = useState<CustomerResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(true);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(true);
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [isPurchaseOrderLinesLoading, setIsPurchaseOrderLinesLoading] = useState(true);
    const [purchaseOrderLines, setPurchaseOrderLines] = useState<PurchaseOrderLineCollectionResponse>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isOriginatorLoading, setIsOriginatorLoading] = useState(false);
    const [originatorData, setOriginatorData] = useState<UserResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isVehicleLoading, setIsVehicleLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleResponseData>();
    const [isAttachmentsLoading, setIsAttachmentsLoading] = useState(true);
    const [attachmentsData, setAttachmentsData] = useState<Array<PurchaseOrderAttachmentResponseData>>([]);
    const [isReceivedActivityLoading, setIsReceivedActivityLoading] = useState(false);
    const [receivedActivityData, setReceivedActivityData] = useState<PurchaseOrderActivityResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getPurchaseOrderData();
        getPurchaseOrderLines();
    }, [purchaseOrderID]);


    useEffect(() => {
        if (purchaseOrderData === undefined) return;
        getReceivedActivity(purchaseOrderData.id);
    }, [JSON.stringify(purchaseOrderData)]);


    const getPurchaseOrderData = () => {
        getAPI(`purchase_orders/${purchaseOrderID}`, {}, (response: any) => {
            const purchaseOrderData: PurchaseOrderResponseData = response.data;
            setPurchaseOrderData(purchaseOrderData);
            getAssignedCustomerData(purchaseOrderData.data.assigned_customer_id);
            getSupplierData(purchaseOrderData.data.supplier_id);
            getCostCentre(purchaseOrderData.data.cost_centre_id);
            getAttachments(purchaseOrderData.id);
            getOriginator(purchaseOrderData.data.created_by_id);
            purchaseOrderData.data.customer_id && getCustomer(purchaseOrderData.data.customer_id);
            purchaseOrderData.data.user_id && getUser(purchaseOrderData.data.user_id);
            purchaseOrderData.data.vehicle_id && getVehicle(purchaseOrderData.data.vehicle_id);
            purchaseOrderData.data.ticket_number && purchaseOrderData.data.department_id && getTicket(purchaseOrderData.data.ticket_number, purchaseOrderData.data.department_id);
            purchaseOrderData.data.job_number && purchaseOrderData.data.department_id && getJob(purchaseOrderData.data.job_number, purchaseOrderData.data.department_id);
            purchaseOrderData.data.department_id && getDepartment(purchaseOrderData.data.department_id);
        }, setIsPurchaseOrderLoading);
    }

    const getPurchaseOrderLines = () => {
        getAPI(`purchase_order_lines`, {
            purchase_order_ids: [purchaseOrderID]
        }, (response: any) => {
            const purchaseOrderLinesData: PurchaseOrderLineCollectionResponse = response.data;
            setPurchaseOrderLines(purchaseOrderLinesData);
        }, setIsPurchaseOrderLinesLoading);
    }

    const getAssignedCustomerData = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setAssignedCustomerData(customerData);
        }, setIsAssignedCustomerLoading);
    }

    const getSupplierData = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
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

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getOriginator = (originatorID: number) => {
        getAPI(`users/${originatorID}`, {}, (response: any) => {
            const originatorData: UserResponseData = response.data;
            setOriginatorData(originatorData);
        }, setIsOriginatorLoading);
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

    const getAttachments = (purchaseOrderID: number) => {
        getAPI('purchase_order_attachments', {
            purchase_order_id: purchaseOrderID,
            is_active: true
        }, (response: any) => {
            const attachmentData: PurchaseOrderAttachmentCollectionResponse = response.data;
            setAttachmentsData(attachmentData.data);
        }, setIsAttachmentsLoading);
    }

    const getReceivedActivity = (purchaseOrderID: number) => {
        getAPI(`purchase_order_activity`, {
            purchase_order_id: purchaseOrderID,
            type: 8,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderActivityData: PurchaseOrderActivityCollectionResponse = response.data;
            setReceivedActivityData(purchaseOrderActivityData.data[0]);
        }, setIsReceivedActivityLoading)    
    }

    const isLoading = (
        isPurchaseOrderLoading || 
        isAssignedCustomerLoading || 
        isSupplierLoading || 
        isCostCentreLoading || 
        isAttachmentsLoading || 
        isPurchaseOrderLinesLoading ||
        isCustomerLoading || 
        isVehicleLoading || 
        isUserLoading || 
        isOriginatorLoading ||
        isReceivedActivityLoading || 
        isTicketLoading ||
        isDepartmentLoading ||
        isJobLoading
    )

    const isHeaderLoading = (
        isPurchaseOrderLoading || 
        isCostCentreLoading 
    )
    
    return (
        <OuterContainer
            title='Purchase Order'
            id={purchaseOrderID}
            headerContent={
                !isHeaderLoading && purchaseOrderData && costCentreData ?
                <div className="flex">
                    <PurchaseOrderStatusLabel 
                        isSent={purchaseOrderData.data.sent_by_id !== null}
                        isOutstanding={purchaseOrderData.data.is_outstanding}
                        hasReceived={purchaseOrderData.data.has_received}
                    />
                    {purchaseOrderData.data.sent_by_id !== null ? <PurchaseOrderAccountsStatusLabel 
                        isAccountsOutstanding={purchaseOrderData.data.is_accounts_outstanding}
                        hasReconciled={purchaseOrderData.data.has_reconciled}
                    /> : null}
                    <AssociatedResourceTypeLabel resourceType={costCentreData.data.associated_resource_type}/>
                </div>
                :
                <div className="flex">
                    <Skeleton type='label'/>
                    <Skeleton type="label"/>
                </div>
            }
            maxWidth={1800}
            bigID
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && purchaseOrderData && purchaseOrderLines && assignedCustomerData && supplierData && costCentreData && originatorData ?
                        <PurchaseOrderInformation 
                            purchaseOrderID={parseInt(purchaseOrderID as string)}
                            purchaseOrderData={purchaseOrderData.data}
                            purchaseOrderLines={purchaseOrderLines}
                            originator={originatorData}
                            attachments={attachmentsData}
                            getAttachments={() => getAttachments(purchaseOrderData.id)}
                            assignedCustomer={assignedCustomerData}
                            customerData={customerData}
                            supplier={supplierData}
                            costCentre={costCentreData} 
                            userData={userData} 
                            vehicleData={vehicleData}
                            ticketData={ticketData}
                            jobData={jobData}
                            departmentData={departmentData}
                            isEdit={isEditMode}                            
                            setIsEditMode={setIsEditMode}
                            setPurchaseOrderLines={setPurchaseOrderLines}
                            receivedAt={receivedActivityData?.data.created_at} 

                        />
                        :
                        <PurchaseOrderInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <PurchaseOrderSideBar
                        purchaseOrder={purchaseOrderData}
                        purchaseOrderLines={purchaseOrderLines}
                        costCentre={costCentreData}
                        supplier={supplierData}
                        vehicleData={vehicleData}
                        customerData={undefined} 
                        userData={undefined}                    
                        attachments={attachmentsData}
                        getAttachments={getAttachments}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        setPurchaseOrderData={setPurchaseOrderData} 
                        setPurchaseOrderLines={setPurchaseOrderLines}
                        getPurchaseOrderData={getPurchaseOrderData}
                    />
                </div>
            </div>
        </OuterContainer>
    )
}

export default PurchaseOrderPage