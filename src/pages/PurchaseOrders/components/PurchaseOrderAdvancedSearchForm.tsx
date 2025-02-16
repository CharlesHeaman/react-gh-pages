import { ChangeEvent, Dispatch, SetStateAction } from "react"
import SupplierSelect from "../../../components/form/SupplierSelect/SupplierSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import updateStateParams from "../../../utils/updateStateParams/updateStateParams"
import CustomerSelect from "../../../components/form/SelectCustomer/CustomerSelect"
import { CustomerResponseData } from "../../../types/customers.types"


export interface AdvancedPurchaseOrderSearchForm {
    customer_id: number,
    supplier_id: number,
}

const CustomerAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedPurchaseOrderSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedPurchaseOrderSearchForm>>,
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
}) => {

    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Customer'>
                        <CustomerSelect 
                            selectedCustomer={props.selectedCustomer} 
                            setSelectedCustomer={props.setSelectedCustomer}
                            hasSubmitted                 
                        />
                    </GridItem>
                    <GridItem title='Supplier'>
                        <SupplierSelect
                            selectedSupplier={props.selectedSupplier}
                            setSelectedSupplier={props.setSelectedSupplier}
                            isSupplier
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CustomerAdvancedSearchForm