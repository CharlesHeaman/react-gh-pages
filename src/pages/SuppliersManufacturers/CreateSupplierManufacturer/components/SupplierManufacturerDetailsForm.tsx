import { ChangeEvent } from "react";
import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput";
import CodeInput from "../../../../components/form/CodeInput/CodeInput";
import PostcodeInput from "../../../../components/form/PostcodeInput/PostcodeInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";

const SupplierManufacturerDetailsForm = (props: {
    supplierManufacturerDetails: CreateSupplierManufacturerAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    supplierManufacturerCodeUnique: boolean,
    checkUniqueSupplierManufacturerCode: () => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => (
    <section>
        {props.isEdit && <h2>Supplier/Manufacturer Details</h2>}
        <InfoGrid columnCount={12}>
            <GridItem title='Name' span={8}>
                <TextInput
                    name="name"
                    label="Name"
                    value={props.supplierManufacturerDetails.name}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required
                    autoFocus />
            </GridItem>
            <GridItem title='Code' span={4}>
                <CodeInput
                    name="code"
                    value={props.supplierManufacturerDetails.code}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    isUnique={props.supplierManufacturerCodeUnique}
                    checkUnique={props.checkUniqueSupplierManufacturerCode}
                    required />
            </GridItem>
            <GridItem title='Address' span={8}>
                <TextareaInput
                    minRows={3}
                    name="address"
                    label="Address"
                    value={props.supplierManufacturerDetails.address}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required />
            </GridItem>
            <GridItem title='Postcode' span={4}>
                <PostcodeInput
                    name="postcode"
                    value={props.supplierManufacturerDetails.postcode}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required />
            </GridItem>
            <GridItem title='Supplier' span={3}>
                <CheckboxInput 
                    name="is_supplier"
                    checked={props.supplierManufacturerDetails.is_supplier} 
                    updateFunc={props.updateCheckboxParams} 
                />
            </GridItem>
            <GridItem title='Manufacturer' span={3}>
                <CheckboxInput 
                    name="is_manufacturer"
                    checked={props.supplierManufacturerDetails.is_manufacturer} 
                    updateFunc={props.updateCheckboxParams} 
                />
            </GridItem>
            <GridItem title='Gas Supplier' span={3}>
                <CheckboxInput 
                    name="is_gas_supplier"
                    checked={props.supplierManufacturerDetails.is_gas_supplier} 
                    updateFunc={props.updateCheckboxParams} 
                />
            </GridItem>
            <GridItem title='Sub-contractor' span={3}>
                <CheckboxInput 
                    name="is_sub_contractor"
                    checked={props.supplierManufacturerDetails.is_sub_contractor} 
                    updateFunc={props.updateCheckboxParams} 
                />
            </GridItem>
            <GridItem title='Notes' secondaryTitle="(optional)">
                <TextareaInput
                    name="notes"
                    value={props.supplierManufacturerDetails.notes}
                    label="Notes"
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors} 
                />
            </GridItem>
        </InfoGrid>
    </section>
)

export default SupplierManufacturerDetailsForm