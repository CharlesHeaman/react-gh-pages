import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import TextareaInput from "../../../../../../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContractResponseData } from "../../../../../../../../../types/contract.types"
import putAPI from "../../../../../../../../../utils/putAPI"
import TextInput from "../../../../../../../../../components/form/TextInput/TextInput"

const UpdateContractPurchaseOrderNumber = (props: {
    contractID: number,
    purchaseOrderNumber: string | null,
    show: boolean,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState<string>(props.purchaseOrderNumber ? props.purchaseOrderNumber : '');    

    const updateContract = () => {
        putAPI(`contracts/${props.contractID}/update_purchase_order_number`, {}, {
            purchase_order_number: purchaseOrderNumber,
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            props.setContractData(contractData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Update Contract PO Number'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Update PO Number"
                iconFont="edit_note"
                disabled={purchaseOrderNumber.length === 0}
                clickFunc={updateContract}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem title='Purchase Order Number'>
                    <TextInput
                        name="purchase_order_number"
                        value={purchaseOrderNumber}
                        updateFunc={(event) => setPurchaseOrderNumber(event.target.value)}
                        autoFocus
                        required
                    />
                </GridItem>
            </InfoGrid>            
        </WindowOverlay>
    )
}

export default UpdateContractPurchaseOrderNumber