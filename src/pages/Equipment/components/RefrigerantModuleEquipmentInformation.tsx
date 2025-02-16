import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import RefrigerantLink from "../../../components/ui/Links/RefrigerantLink"
import { Equipment } from "../../../types/equipment.types"
import { RefrigerantResponseData } from "../../../types/refrigerant.types"
import formatWeight from "../../../utils/formatWeight"
import getEquipmentCO2 from "../utils/getEquipmentCO2"
import FGasTypeLabel from "./FGasTypeLabel"

const RefrigerantModuleEquipmentInformation = (props: {
    equipment: Equipment,
    refrigerant: RefrigerantResponseData | undefined
}) => {
    return (
        <>
            <section>
                <h2>Refrigerant Details</h2>
                <InfoGrid>
                    <GridItem title='Refrigerant' span={2}>
                        <p>{props.refrigerant ? <RefrigerantLink refrigerantID={props.refrigerant.id} name={props.refrigerant.data.name}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Refrigerant Charge' span={2}>
                        <p>{formatWeight(props.equipment.refrigerant_charge)}kg</p>
                    </GridItem>
                    <GridItem title='F-Gas Type' span={2}>
                        <FGasTypeLabel fGasType={props.equipment.f_gas_type}/>
                    </GridItem>
                    <GridItem title='GWP' span={2}>
                        <p>{props.refrigerant ? `${formatWeight(props.refrigerant.data.global_warming_potential)}kg` : 'None'}</p>
                    </GridItem>
                    <GridItem title={<>CO<sub>2</sub></>} span={4}>
                        <p>{props.refrigerant ? formatWeight(getEquipmentCO2(props.refrigerant.data.global_warming_potential, props.equipment.refrigerant_charge)) : 'None'}kg</p>
                    </GridItem>
                    <GridItem title='Leak Detection Fixed' span={2}>
                        <BooleanLabel true={props.equipment.is_leak_detection_fitted}/>
                    </GridItem>
                    <GridItem title='Hermetically Sealed' span={4}>
                        <BooleanLabel true={props.equipment.is_hermetically_sealed}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default RefrigerantModuleEquipmentInformation