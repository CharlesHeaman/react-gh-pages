import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreResponseData } from "../../types/costCentres.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { ProductCollectionResponse } from "../../types/products.types";
import { PurchaseOrderResponseData } from "../../types/purchaseOrder.types";
import { PurchaseOrderActivityCollectionResponse } from "../../types/purchaseOrderActivity.types";
import { PurchaseOrderAttachmentCollectionResponse, PurchaseOrderAttachmentResponseData } from "../../types/purchaseOrderAttachments.types";
import { PurchaseOrderLineCollectionResponse } from "../../types/PurchaseOrderLines.types";
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types";
import { TicketCollectionResponse } from "../../types/tickets.types";
import { UserResponseData } from "../../types/user.types";
import { VehicleResponseData } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import postAPI from "../../utils/postAPI";
import ReceiveOrderItems from "./components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceiveOrderItems";
import { ReceivePurchaseOrderLineData } from "./components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceivePurchaseOrderLinesList";

const ReconcilePurchaseOrderItemsPage = ()  => {
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


    // From States 
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isCreating, setIsCreating] = useState(false);
    const [purchaseOrderLinesReceiveData, setPurchaseOrderLinesReceiveData] = useState<Array<ReceivePurchaseOrderLineData>>([]);

    useEffect(() => {
        getPurchaseOrderData();
        getPurchaseOrderLines();
    }, [purchaseOrderID]);

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

    const reconcilePurchaseOrderLines = () => {
        // Sanitize Lines
        const sanitizedLines = purchaseOrderLinesReceiveData.map(editLine => {
            return {
                ...editLine,
                new_quantity_received: isNaN(parseInt(editLine.new_quantity_received)) ? '0' : editLine.new_quantity_received
            }
        })
        // Filter Updated Lines
        const updatedLines = sanitizedLines.filter(editLine => parseInt(editLine.new_quantity_received) > 0);
        postAPI(`purchase_orders/${purchaseOrderID}/reconcile_lines`, {}, {
            reconciled_lines: updatedLines,
        }, (response: any) => {
            navigate('../', { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Invoice Reconciled Items',
            form: purchaseOrderLines ? <ReceiveOrderItems
                purchaseOrderLines={purchaseOrderLines}
                purchaseOrderLinesReceiveData={purchaseOrderLinesReceiveData}
                setPurchaseOrderLinesReceiveData={setPurchaseOrderLinesReceiveData}
                isReconcile
            /> : null,
            isComplete: true
        },
        {
            header: 'Review Information',
            form: costCentreData && purchaseOrderLines ? <>
                <ReceiveOrderItems
                    purchaseOrderLines={purchaseOrderLines}
                    purchaseOrderLinesReceiveData={purchaseOrderLinesReceiveData}
                    setPurchaseOrderLinesReceiveData={setPurchaseOrderLinesReceiveData}
                    isReconcile
                    isPreview
                />
            </> : undefined,
            isComplete: false
        }
    ]
    
    return (
        <OuterContainer
            title='Invoice Reconcile Purchase Order Items'
            description="Complete this form to reconcile purchase order items and adjust product and requisition prices, if necessary."
            maxWidth={1800}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Order Items"
                iconFont="fact_check"
                actionName="Reconcile"
                isCreating={isCreating}
                createFunc={reconcilePurchaseOrderLines}
            />
        </OuterContainer>
    )
}

export default ReconcilePurchaseOrderItemsPage