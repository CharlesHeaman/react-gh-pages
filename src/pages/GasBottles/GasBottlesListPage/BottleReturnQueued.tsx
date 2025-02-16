import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import { GasBottleCollectionResponse } from "../../../types/gasBottle.types"
import GasBottleList from "./components/GasBottleList"

const BottleReturnQueued = (props: {
    isGasBottlesLoading: boolean,
    gasBottles: GasBottleCollectionResponse | undefined,
    isConsumable?: boolean,
    isPreview?: boolean,
}) => {
    return (
        <section>
            {props.isPreview ? <h2>Queued Bottles</h2> : null}
            {props.gasBottles && props.gasBottles.data.length > 0 ?
                <GasBottleList 
                    hasSearched={true} 
                    isGasBottlesLoading={props.isGasBottlesLoading}
                    gasBottles={props.gasBottles}
                    perPage={20}
                    isConsumable={props.isConsumable}
                    isReturn
                /> :
                <InnerContainer>
                    <NoneFound 
                        iconFont={"propane_tank"} 
                        text={"No bottles found"}
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default BottleReturnQueued