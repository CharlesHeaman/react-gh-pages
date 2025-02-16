import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import RefrigerantLink from "../../../../components/ui/Links/RefrigerantLink"
import { GasBottle } from "../../../../types/gasBottle.types"
import { RefrigerantResponseData } from "../../../../types/refrigerant.types"
import formatWeight from "../../../../utils/formatWeight"
import RefrigerantMovementLabel from "../../../RefrigerantMovements/components/RefrigerantMovementLabel"

const BottleInformationDetails = (props: {
    gasBottle: GasBottle,
    refrigerant: RefrigerantResponseData,
    isConsumable?: boolean,
}) => {
    return (
        <section>
            <h2>Gas Bottle Details</h2>
            <InfoGrid columnCount={props.isConsumable ? 4 : 6}>
                <GridItem title='Number' span={2}>
                    <p>{props.gasBottle.number}</p>
                </GridItem>
                <GridItem title={props.isConsumable ? 'Gas/Air' : 'Refrigerant'} span={2}>
                    <RefrigerantLink refrigerantID={props.refrigerant.id} name={props.refrigerant.data.name}/>
                </GridItem>
                {!props.isConsumable ? <>
                    <GridItem title='Type' span={2}>
                        <RefrigerantMovementLabel isDecant={props.gasBottle.is_decant}/>
                    </GridItem>
                    <GridItem title='Bottle Weight' span={2}>
                        <p>{formatWeight(props.gasBottle.current_gas_weight + props.gasBottle.tare_weight)}kg</p>
                    </GridItem>                    
                    <GridItem title='Tare Weight' span={2}>
                        <p>{props.gasBottle.tare_weight}kg</p>
                    </GridItem>                    
                    <GridItem title={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Weight`} span={2}> 
                        <p>{props.gasBottle.current_gas_weight}kg</p>
                    </GridItem>
                </> : null}
            </InfoGrid>
        </section>
    )
}

export default BottleInformationDetails