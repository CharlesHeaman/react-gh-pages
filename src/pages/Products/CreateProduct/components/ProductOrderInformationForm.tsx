import { ChangeEvent, Dispatch, SetStateAction } from "react";
import SupplierSelect from "../../../../components/form/SupplierSelect/SupplierSelect";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateProductAttributes } from "../../../../types/products.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";

const ProductOrderInformationForm = (props: {
    productDetails: CreateProductAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    selectedManufacturer: SupplierManufacturerResponseData | undefined,
    setSelectedManufacturer: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Order Information</h2>}
            <InfoGrid>                
                <GridItem title='Supplier' span={3}>
                    <SupplierSelect 
                        selectedSupplier={props.selectedSupplier} 
                        setSelectedSupplier={props.setSelectedSupplier} 
                        isSupplier
                        required
                        hasSubmitted={props.showErrors}  
                    />
                </GridItem>
                <GridItem title='Manufacturer' span={3}>
                    <SupplierSelect 
                        selectedSupplier={props.selectedManufacturer} 
                        setSelectedSupplier={props.setSelectedManufacturer} 
                        isManufacturer
                        required
                        hasSubmitted={props.showErrors}  
                    />
                </GridItem>
                <GridItem title='Catalogue Number' span={3}>
                    <TextInput
                        name="catalogue_number"
                        label="Catalogue number"
                        value={props.productDetails.catalogue_number}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Manufacturer Part Number' span={3}>
                    <TextInput
                        name="part_number"
                        label="Manufacturer part number"
                        value={props.productDetails.part_number}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ProductOrderInformationForm