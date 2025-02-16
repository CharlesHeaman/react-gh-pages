import { ChangeEvent, Dispatch, SetStateAction } from "react";
import SupplierSelect from "../../../../../components/form/SupplierSelect/SupplierSelect";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateEquipmentAttributes } from "../../../../../types/equipment.types";
import { SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types";

const EquipmentSupplierManufacturerForm = (props: {
    selectedSupplier: SupplierManufacturerResponseData | undefined
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    selectedManufacturer: SupplierManufacturerResponseData | undefined
    setSelectedManufacturer: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    equipmentDetails: CreateEquipmentAttributes,
    setSupplierData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    setManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {    
    return (
        <section>
            {props.isEdit && <h2>Supplier/Manufacturer Information</h2>}
            <InfoGrid>
                <GridItem title='Supplier' span={3} secondaryTitle="(optional)">
                    <SupplierSelect
                        selectedSupplier={props.selectedSupplier}
                        setSelectedSupplier={props.setSelectedSupplier}
                        hasSubmitted={props.showErrors}
                        isSupplier
                    />
                </GridItem>
                <GridItem title='Manufacturer' span={3} secondaryTitle="(optional)">
                    <SupplierSelect
                        selectedSupplier={props.selectedManufacturer}
                        setSelectedSupplier={props.setSelectedManufacturer}
                        hasSubmitted={props.showErrors}
                        isManufacturer
                    />
                </GridItem>
                <GridItem title='Model Number' span={3}>
                    <TextInput
                        name="model_number"
                        value={props.equipmentDetails.model_number}
                        label="Model number"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Serial Number' span={3}>
                    <TextInput
                        name="serial_number"
                        value={props.equipmentDetails.serial_number}
                        label="Serial number"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Model Number 2' secondaryTitle="(optional)" span={3}>
                    <TextInput
                        name="model_number_2"
                        value={props.equipmentDetails.model_number_2}
                        label="Model number 2"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Serial Number 2' secondaryTitle="(optional)" span={3}>
                    <TextInput
                        name="serial_number_2"
                        value={props.equipmentDetails.serial_number_2}
                        label="Serial number 2"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentSupplierManufacturerForm