import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { PurchaseOrderLineCollectionResponse } from "../../../../../types/PurchaseOrderLines.types"
import { CostCentreResponseData } from "../../../../../types/costCentres.types"
import { CustomerResponseData } from "../../../../../types/customers.types"
import { PurchaseOrderResponseData } from "../../../../../types/purchaseOrder.types"
import { PurchaseOrderAttachmentResponseData } from "../../../../../types/purchaseOrderAttachments.types"
import { SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../../types/user.types"
import { VehicleResponseData } from "../../../../../types/vehicles.types"
import SendPurchaseOrder from "./components/SendPurchaseOrder"

const PurchaseOrderActions = (props: {
    purchaseOrderID: number,
    costCentre: CostCentreResponseData,
    isSent: boolean,
    isOutstanding: boolean,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse,
    supplier: SupplierManufacturerResponseData,
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    setPurchaseOrderData: Dispatch<SetStateAction<PurchaseOrderResponseData | undefined>>,
    setPurchaseOrderLines: Dispatch<SetStateAction<PurchaseOrderLineCollectionResponse | undefined>>
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    attachments: Array<PurchaseOrderAttachmentResponseData>,
    getPurchaseOrderData: () => void
}) => {
    const navigate = useNavigate();
    
    const [showSend, setShowSend] = useState(false);

    return (
        <>
            {!props.isSent || props.isOutstanding ? <SideBarModule title="Actions">
                {!props.isSent ? 
                    <>
                        <SideBarButton 
                            text='Send Purchase Order' 
                            iconFont="email" 
                            color="light-green" 
                            clickEvent={() => setShowSend(true)}
                        />
                        <SideBarButton 
                            text='Edit Order Items'
                            color="orange"
                            iconFont='edit_note'
                            clickEvent={() => props.setIsEditMode(true)}
                        />
                    </> :
                    <>
                        {props.isOutstanding && <SideBarButton 
                            text='Receive Order Items' 
                            iconFont="fact_check" 
                            color="dark-blue" 
                            clickEvent={() => navigate('receive_items')}
                        />}
                    </>
                }
            </SideBarModule> : null}

            <SendPurchaseOrder
                purchaseOrderID={props.purchaseOrderID}
                supplier={props.supplier}
                attachments={props.attachments}
                setPurchaseOrderData={props.setPurchaseOrderData}
                show={showSend}
                hideFunc={() => setShowSend(false)}
            />
        </>
    )
}

export default PurchaseOrderActions