import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Equipment } from "../../../types/equipment.types"

const GasModuleEquipmentInformation = (props: {
    equipment: Equipment,
}) => {
    return (
        <>
            <section>
                <h2>Gas Details</h2>
                <InfoGrid>
                    <GridItem title='Gas Council Number' span={3}>
                        <p>{props.equipment.gas_council_number ? props.equipment.gas_council_number : 'None'}</p>
                    </GridItem>
                    <GridItem title='Pump' span={3}>
                        <p>{props.equipment.pump ? props.equipment.pump : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default GasModuleEquipmentInformation