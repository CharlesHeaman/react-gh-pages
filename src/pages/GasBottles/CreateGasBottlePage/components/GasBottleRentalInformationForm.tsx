import { ChangeEvent, Dispatch, SetStateAction } from "react";
import DateInput from "../../../../components/form/DateInput/DateInput";
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateGasBottleAttributes } from "../../../../types/gasBottle.types";
import SupplierSelect from "../../../../components/form/SupplierSelect/SupplierSelect";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";

const GasBottleRentalInformationForm = (props: {
    gasBottleDetails: CreateGasBottleAttributes,
    selectedSupplier: SupplierManufacturerResponseData | undefined
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    updateDateParams: (date: Date, name: string) => void,
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>                
                <GridItem title='Supplier'>
                    <SupplierSelect
                        selectedSupplier={props.selectedSupplier}
                        setSelectedSupplier={props.setSelectedSupplier}
                        hasSubmitted={props.showErrors}
                        required
                        isGasSupplier
                    />
                </GridItem>                
                <GridItem title='Rental Start' span={3}>
                    <DateInput
                        name="received_date"
                        label="Rental start"
                        value={props.gasBottleDetails.received_date}
                        updateFunc={props.updateDateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Rental Period' span={3}>
                    <IntegerInput
                        name="rental_months"
                        label="Rental months"
                        value={props.gasBottleDetails.rental_months}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        suffix="months"
                        maxWidth={100}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default GasBottleRentalInformationForm