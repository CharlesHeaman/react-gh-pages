import { ChangeEvent, Dispatch, SetStateAction } from "react";
import SupplierSelect from "../../../../components/form/SupplierSelect/SupplierSelect";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateSupplierContactAttributes } from "../../../../types/supplierContact.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";

const SupplierContactSelectSupplierManufacturer = (props: {
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedCSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    contactDetails: CreateSupplierContactAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean
}) => {
    return (
        <section>
            <InfoGrid>
                <GridItem title='Supplier/Manufacturer'>
                    <SupplierSelect 
                        selectedSupplier={props.selectedSupplier} 
                        setSelectedSupplier={props.setSelectedCSupplier} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierContactSelectSupplierManufacturer