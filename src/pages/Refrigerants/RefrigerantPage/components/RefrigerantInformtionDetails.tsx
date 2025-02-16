import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Refrigerant } from "../../../../types/refrigerant.types"
import RefrigerantGasAirTypeLabel from "./RefrigerantGasAirTypeLabel"

const RefrigerantInformationDetails = (props: {
    refrigerantData: Refrigerant
}) => {
    return (
         <section>
                <h2>Refrigerant, Gas/Air Details</h2>
                <InfoGrid>
                    <GridItem title='Name' span={3}>
                        <p>{props.refrigerantData.name}</p>
                    </GridItem>
                    <GridItem title='Common Name' span={3}>
                        <p>{props.refrigerantData.common_name}</p>
                    </GridItem>
                    <GridItem title='Type' span={3}> 
                        <RefrigerantGasAirTypeLabel isConsumable={props.refrigerantData.is_consumable}/>
                    </GridItem>
                    <GridItem title='Global Warming Potential' span={3}>
                        <p>{props.refrigerantData.global_warming_potential}</p>
                    </GridItem>
                    <GridItem title='Notes'>
                        <p>{props.refrigerantData.notes ? props.refrigerantData.notes : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
    )
}

export default RefrigerantInformationDetails