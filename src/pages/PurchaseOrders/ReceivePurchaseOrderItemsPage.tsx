import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreResponseData } from "../../types/costCentres.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { ProductCollectionResponse, ProductResponseData } from "../../types/products.types";
import { PurchaseOrderResponseData } from "../../types/purchaseOrder.types";
import { PurchaseOrderActivityCollectionResponse, PurchaseOrderActivityResponseData } from "../../types/purchaseOrderActivity.types";
import { PurchaseOrderAttachmentCollectionResponse, PurchaseOrderAttachmentResponseData } from "../../types/purchaseOrderAttachments.types";
import { PurchaseOrderLineCollectionResponse } from "../../types/PurchaseOrderLines.types";
import { CreateRequisitionAttributes } from "../../types/requisition.types";
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import { UserResponseData } from "../../types/user.types";
import { VehicleResponseData } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import postAPI from "../../utils/postAPI";
import updateStateParams from "../../utils/updateStateParams/updateStateParams";
import RequisitionInformationDetails from "../Requisitions/components/RequisitionInformationDetails";
import isRequisitionDetailsFormValid from "../Requisitions/utils/isRequisitionDetailsFormValid";
import ReceiveOrderItems from "./components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceiveOrderItems";
import { ReceivePurchaseOrderLineData } from "./components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceivePurchaseOrderLinesList";
import CreatePurchaseOrderAssociatedRequisition from "./CreatePurchaseOrderAssociatedRequisition";
import ReceivePurchaseOrderItemsRequisitionLines from "./ReceivePurchaseOrderItemsRequisitionLines";
import getMappedRequisitionLine from "./utils/getMappedRequisitionLine";

const ReceivePurchaseOrderItemsPage = ()  => {
    const navigate = useNavigate();
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
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<Array<ProductResponseData>>([]);


    // From States 
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isCreating, setIsCreating] = useState(false);
    const [requisitionDetails, setRequisitionDetails] = useState<CreateRequisitionAttributes>({
        notes: ''
    });
    const [selectedAssigned, setSelectedAssigned] = useState<UserResponseData>();
    const [createRequisition, setCreateRequisition] = useState(true);
    const [purchaseOrderLinesReceiveData, setPurchaseOrderLinesReceiveData] = useState<Array<ReceivePurchaseOrderLineData>>([]);

    const requisitionLines = purchaseOrderLinesReceiveData.filter(line => 
        line.product_id > 0 && 
        parseInt(line.new_quantity_received) > 0
    );

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
            purchaseOrderData.data.department_id && getDepartment(purchaseOrderData.data.department_id);
        }, setIsPurchaseOrderLoading);
    }

    const getPurchaseOrderLines = () => {
        getAPI(`purchase_order_lines`, {
            purchase_order_ids: [purchaseOrderID]
        }, (response: any) => {
            const purchaseOrderLinesData: PurchaseOrderLineCollectionResponse = response.data;
            setPurchaseOrderLines(purchaseOrderLinesData);
            if (purchaseOrderLinesData.data.length > 0) {
                getProducts([...new Set(purchaseOrderLinesData.data.map(line => line.data.product_id))]);
            } else {
                setIsProductsLoading(false)
            }
        }, setIsPurchaseOrderLinesLoading);
    }

    const getProducts = (productIDs: Array<number | null>) => {
        getAPI('products', {
            ids: productIDs
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData.data)
        }, setIsProductsLoading)
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
            if (ticketData.data[0].data.engineers[0]) getAssignedUser(ticketData.data[0].data.engineers[0].user_id);
        }, setIsTicketLoading);
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

    const getAssignedUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setSelectedAssigned(userData);
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

    const receivePurchaseOrderLines = () => {
        // Sanitize Lines
        const sanitizedLines = purchaseOrderLinesReceiveData.map(editLine => {
            return {
                ...editLine,
                new_quantity_received: isNaN(parseInt(editLine.new_quantity_received)) ? '0' : editLine.new_quantity_received
            }
        })
        // Filter Updated Lines
        const updatedLines = sanitizedLines.filter(editLine => parseInt(editLine.new_quantity_received) > 0);
        postAPI(`purchase_orders/${purchaseOrderID}/receive_lines`, {}, {
            received_lines: updatedLines,
            requisition_data: createRequisition ? {
                ...requisitionDetails,
                recipient_id: selectedAssigned?.id,
                cost_centre_id: costCentreData?.id,
                customer_id: customerData?.id,
                user_id: userData?.id,
                vehicle_id: vehicleData?.id,
                department_id: departmentData?.id,
                ticket_number: ticketData?.data.number,
                job_number: undefined
            } : undefined,
            requisition_lines: createRequisition ? requisitionLines.map(line => {
                return getMappedRequisitionLine(line, productData);
            }) : undefined
        }, (response: any) => {
            navigate('../', { relative: 'path' })
        }, setIsCreating)
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setRequisitionDetails)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Received Items',
            form: purchaseOrderLines ? <ReceiveOrderItems
                purchaseOrderLines={purchaseOrderLines}
                purchaseOrderLinesReceiveData={purchaseOrderLinesReceiveData}
                setPurchaseOrderLinesReceiveData={setPurchaseOrderLinesReceiveData}
                /> : null,
                isComplete: true
        },
        {
            header: 'Requisition Details',
            form: costCentreData ? <CreatePurchaseOrderAssociatedRequisition
                requisitionDetails={requisitionDetails}
                costCentre={costCentreData}
                vehicleData={vehicleData}
                userData={userData} 
                customerData={undefined} 
                ticketData={ticketData} 
                departmentData={departmentData}     
                selectedAssigned={selectedAssigned}
                setSelectedAssigned={setSelectedAssigned} 
                updateParams={updateParams}      
                createRequisition={createRequisition}
                setCreateRequisition={setCreateRequisition}
                showErrors={maxStepSubmitted > 1}
            /> : null,
            isComplete: isRequisitionDetailsFormValid(costCentreData, selectedAssigned?.id, customerData?.id, userData?.id, undefined, ticketData?.id, undefined) || !createRequisition
        },
        {
            header: 'Review Information',
            form: costCentreData && purchaseOrderLines ? <>
                <ReceiveOrderItems
                    purchaseOrderLines={purchaseOrderLines}
                    purchaseOrderLinesReceiveData={purchaseOrderLinesReceiveData}
                    setPurchaseOrderLinesReceiveData={setPurchaseOrderLinesReceiveData}
                    isPreview
                />
                {createRequisition && selectedAssigned ? <>
                    <hr/>
                    <RequisitionInformationDetails
                        notes={requisitionDetails.notes}
                        createdAt={new Date()}
                        engineer={selectedAssigned}
                        costCentre={costCentreData}
                        customerData={undefined}
                        userData={userData}
                        vehicleData={vehicleData}
                        jobData={undefined}
                        ticketData={ticketData}
                        departmentData={departmentData}
                        isPreview
                    />
                    <hr/>
                    <ReceivePurchaseOrderItemsRequisitionLines
                        purchaseOrderLinesReceive={requisitionLines}
                        products={productData}
                    />
                </> : null}
            </> : undefined,
            isComplete: false
        }
    ]
    
    return (
        <OuterContainer
            title='Receive Purchase Order Items'
            description="Complete this form to receive purchase order items and create associated requisition, if any."
            maxWidth={1800}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Order Items"
                iconFont="fact_check"
                actionName="Receive"
                isCreating={isCreating}
                createFunc={receivePurchaseOrderLines}
            />
        </OuterContainer>
    )
}

export default ReceivePurchaseOrderItemsPage