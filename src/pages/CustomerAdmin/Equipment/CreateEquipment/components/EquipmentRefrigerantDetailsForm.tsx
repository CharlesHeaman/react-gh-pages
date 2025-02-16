import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CheckboxInput from "../../../../../components/form/CheckboxInput/CheckboxInput";
import RefrigerantSelect from "../../../../../components/form/RefrigerantSelect/RefrigerantSelect";
import WeightInput from "../../../../../components/form/WeightInput/WeightInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateEquipmentAttributes } from "../../../../../types/equipment.types";
import { RefrigerantResponseData } from "../../../../../types/refrigerant.types";
import FGasTypeSelect from "./FGasTypeSelect";


const EquipmentRefrigerantDetailsForm = (props: {
    equipmentDetails: CreateEquipmentAttributes,
    selectedRefrigerant: RefrigerantResponseData | undefined,
    setSelectedRefrigerant: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    selectedFGasType: number,
    setSelectedFGasType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Refrigerant Details</h2>}
            <InfoGrid>                    
                <GridItem title='Refrigerant' span={2}>
                    <RefrigerantSelect 
                        selectedRefrigerant={props.selectedRefrigerant} 
                        setSelectedRefrigerant={props.setSelectedRefrigerant} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Refrigerant Charge' span={2}>
                    <WeightInput   
                        name="refrigerant_charge"
                        label="Refrigerant charge"
                        value={props.equipmentDetails.refrigerant_charge}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        maxWidth={75}
                        required
                    />
                </GridItem>
                <GridItem title='F-Gas Type' span={2}>
                    <FGasTypeSelect
                        selectedFGasType={props.selectedFGasType}
                        setSelectedFGasType={props.setSelectedFGasType}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Leak Detection Fixed' span={2}>
                    <CheckboxInput
                        name="is_leak_detection_fitted"
                        checked={props.equipmentDetails.is_leak_detection_fitted}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                <GridItem title='Hermetically Sealed' span={2}>
                    <CheckboxInput
                        name="is_hermetically_sealed"
                        checked={props.equipmentDetails.is_hermetically_sealed}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentRefrigerantDetailsForm