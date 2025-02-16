import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import CodeInput from "../../../../../components/form/CodeInput/CodeInput";
import EquipmentTypeSelect from "../../../../../components/form/SelectEquipmentType/EquipmentTypeSelect";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateEquipmentAttributes } from "../../../../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../../../../types/equipmentType.types";

const EquipmentDetailsForm = (props: {
    selectedEquipmentType: EquipmentTypeResponseData | undefined,
    setSelectedEquipmentType: Dispatch<SetStateAction<EquipmentTypeResponseData | undefined>>
    equipmentDetails: CreateEquipmentAttributes,
    departmentID: number | undefined,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    equipmentCodeUnique: boolean,
    checkUniqueEquipmentCode: () => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Equipment Details</h2>}
            <InfoGrid>                    
                <GridItem title='Code' span={3}>
                    <CodeInput
                        name="code"
                        value={props.equipmentDetails.code}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        isUnique={props.equipmentCodeUnique}
                        checkUnique={props.checkUniqueEquipmentCode}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Equipment Type' span={3}>
                    <EquipmentTypeSelect 
                        selectedEquipmentType={props.selectedEquipmentType} 
                        setSelectedEquipmentType={props.setSelectedEquipmentType} 
                        hasSubmitted={props.showErrors}  
                        departmentID={props.departmentID}
                        required
                    />
                </GridItem>
                <GridItem title='Location' span={3}>
                    <TextareaInput
                        name="location"
                        label="Location"
                        value={props.equipmentDetails.location}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Description' span={3}>
                    <TextareaInput
                        name="description"
                        label="Description"
                        value={props.equipmentDetails.description}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)" span={3}>
                    <TextareaInput
                        name="notes"
                        label="Notes"
                        value={props.equipmentDetails.notes}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Internal Notes' secondaryTitle="(optional)" span={3}>
                    <TextareaInput
                        name="internal_notes"
                        label="Internal Notes"
                        value={props.equipmentDetails.internal_notes}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentDetailsForm