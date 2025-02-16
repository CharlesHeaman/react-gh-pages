import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import { EquipmentResponseData } from "../../../../types/equipment.types"

const QuotedEquipmentEquipmentDetails = (props: {
    equipment: EquipmentResponseData
}) => {
    return (
        <section>   
            <h2>Equipment Details</h2>
            <InfoGrid>
                <GridItem title='Code'>
                    <p><NewEquipmentLink code={props.equipment.data.code}/></p>
                </GridItem>
                <GridItem title='Location' span={3}>
                    <p>{props.equipment.data.location}</p>
                </GridItem>
                <GridItem title='Description' span={3}>
                    <p>{props.equipment.data.description}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default QuotedEquipmentEquipmentDetails