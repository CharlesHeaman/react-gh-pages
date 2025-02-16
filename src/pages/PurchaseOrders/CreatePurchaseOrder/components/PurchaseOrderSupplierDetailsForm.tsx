import { ChangeEvent, Dispatch, SetStateAction } from "react"
import DateInput from "../../../../components/form/DateInput/DateInput"
import FormErrorMessage from "../../../../components/form/FormErrorMessage/FormErrorMessage"
import SupplierSelect from "../../../../components/form/SupplierSelect/SupplierSelect"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreatePurchaseOrderAttributes } from "../../../../types/purchaseOrder.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import DispatchBySelect from "../../components/DispatchBySelect"

const PurchaseOrderSupplierDetailsForm = (props: {
    purchaseOrderDetails: CreatePurchaseOrderAttributes,
    selectedSupplier: SupplierManufacturerResponseData | undefined
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    selectedDispatchBy: number
    setSelectedDispatchBy: Dispatch<SetStateAction<number>>
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (date: Date, name: string) => void,
    showErrors: boolean
}) => {
    
    return (
        <InfoGrid>
            <GridItem title='Supplier'>
                <SupplierSelect
                    selectedSupplier={props.selectedSupplier}
                    setSelectedSupplier={props.setSelectedSupplier}
                    hasSubmitted={props.showErrors}
                    required
                    isSupplier
                />
                {props.selectedSupplier && !props.selectedSupplier.data.is_approved ? <FormErrorMessage 
                    text={`Supplier is ${props.selectedSupplier.data.is_approved === null ? 'pending approval' : 'not approved'}!`}
                    isWarning={props.selectedSupplier.data.is_approved === null}
                    show
                /> : null}
            </GridItem>
            <GridItem title='Delivery Date' span={3}>
                <DateInput
                    name='delivery_date' 
                    value={props.purchaseOrderDetails.delivery_date}
                    label='Contract start'
                    hasSubmitted={props.showErrors} 
                    updateFunc={props.updateDateParams}
                    required
                />
            </GridItem>
            <GridItem title='Dispatch By' span={3}>
                <DispatchBySelect 
                    selectedDispatchBy={props.selectedDispatchBy} 
                    setSelectedDispatchBy={props.setSelectedDispatchBy}
                />
            </GridItem>
            <GridItem title='Special Instructions' secondaryTitle="(optional)">
                <TextareaInput
                    name="special_instructions"
                    value={props.purchaseOrderDetails.special_instructions}
                    label="Special instructions"
                    updateFunc={props.updateParams}
                />
            </GridItem>      
        </InfoGrid>
    )
}

export default PurchaseOrderSupplierDetailsForm 