import { ChangeEvent, Dispatch, SetStateAction } from "react";
import DateInput from "../../../../components/form/DateInput/DateInput";
import RefrigerantSelect from "../../../../components/form/RefrigerantSelect/RefrigerantSelect";
import SupplierSelect from "../../../../components/form/SupplierSelect/SupplierSelect";
import UserSelect from "../../../../components/form/UserSelect/UserSelect";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { RefrigerantResponseData } from "../../../../types/refrigerant.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";
import { UserResponseData } from "../../../../types/user.types";
import updateStateDateParams from "../../../../utils/updateStateParams/updateStateDateParams";

export interface AdvancedGasBottleSearchFormParams {
    refrigerant_id: number,
    assigned_to_id: number,
    supplier_id: number,
    rental_end_before: Date | undefined
}

const GasBottleAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedGasBottleSearchFormParams,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedGasBottleSearchFormParams>>
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    selectedRefrigerant: RefrigerantResponseData | undefined,
    setSelectedRefrigerant: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
}) => {

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, props.setAdvancedSearchParams)
    }

    return (
        <form>
            <section>
                <InfoGrid>
                    <GridItem title='Refrigerant'>
                        <RefrigerantSelect
                            selectedRefrigerant={props.selectedRefrigerant} 
                            setSelectedRefrigerant={props.setSelectedRefrigerant} 
                        />
                    </GridItem>
                    <GridItem title='Assigned To'>
                        <UserSelect 
                            selectedUser={props.selectedUser} 
                            setSelectedUser={props.setSelectedUser} 
                        />
                    </GridItem>
                    <GridItem title='Supplier'>
                        <SupplierSelect
                            selectedSupplier={props.selectedSupplier}
                            setSelectedSupplier={props.setSelectedSupplier}
                            isSupplier
                        />
                    </GridItem>
                    <GridItem title='Rental Ends Before'>
                        <DateInput
                            name="rental_end_before"
                            label="Rental ends before"
                            value={props.advancedSearchParams.rental_end_before}
                            updateFunc={updateDateParams}
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </form>
    )
}

export default GasBottleAdvancedSearchForm