import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Equipment } from "../../../types/equipment.types"
import EnergySourceLabel from "./EnergySourceLabel"

const OilModuleEquipmentInformation = (props: {
    equipment: Equipment,
}) => {
    return (
        <>
            <section>
                <h2>Oil Details</h2>
                <InfoGrid>
                    <GridItem title='Pump' span={3}>
                        <p>{props.equipment.pump ? props.equipment.pump : 'None'}</p>
                    </GridItem>
                    <GridItem title='Nozzle' span={3}>
                        <p>{props.equipment.nozzle ? props.equipment.nozzle : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default OilModuleEquipmentInformation