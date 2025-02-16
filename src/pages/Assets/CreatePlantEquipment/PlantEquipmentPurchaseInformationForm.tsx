import { ChangeEvent } from "react"
import TextInput from "../../../components/form/TextInput/TextInput"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateAssetAttributes } from "../../../types/asset.types"
import DateInput from "../../../components/form/DateInput/DateInput"

const PlantEquipmentPurchaseInformationForm = (props: {
    plantEquipmentDetails: CreateAssetAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (date: Date, name: string) => void, 
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Purchase Information</h2>}
            <InfoGrid>                
                <GridItem title='Purchase Order Number' span={3} secondaryTitle="(optional)">
                    <TextInput
                        name="purchase_order_number"
                        value={props.plantEquipmentDetails.purchase_order_number}
                        label="Make"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Purchase Date' span={3}>
                    <DateInput
                        name="purchase_date"
                        label="Purchase date"
                        value={props.plantEquipmentDetails.purchase_date}
                        updateFunc={props.updateDateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentPurchaseInformationForm