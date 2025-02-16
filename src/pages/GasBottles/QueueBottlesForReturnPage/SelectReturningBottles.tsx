import { useState } from "react";
import BottleSelect from "../../../components/form/BottleSelect/BottleSelect"
import { GasBottleResponseData } from "../../../types/gasBottle.types";
import GasBottleList from "../GasBottlesListPage/components/GasBottleList"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";

const SelectReturningBottles = (props: {
    queuedBottles: Array<GasBottleResponseData>,
    setQueuedBottles: (bottles: Array<GasBottleResponseData>) => void,
    isConsumable: boolean,
    isPreview?: boolean
}) => {
    const [selectedBottle, setSelectedBottle] = useState<GasBottleResponseData>();
    return (
        <>
            {!props.isPreview ? <>
                <section>
                    <h2>Select Bottle</h2>
                    <InfoGrid>
                        <GridItem title="Bottle">
                            <BottleSelect
                                selectedBottle={selectedBottle}
                                setSelectedBottle={setSelectedBottle}
                                isConsumable={props.isConsumable}
                                hasSubmitted={false}
                            />
                            <ContainerFooter>
                                <SubmitButton
                                    text="Queue Bottle For Return"
                                    clickFunc={() => {
                                        if (selectedBottle) {
                                            if (!props.queuedBottles.some(bottle => bottle.id === selectedBottle.id)) {
                                                props.setQueuedBottles([...props.queuedBottles, selectedBottle]);
                                            }
                                            setSelectedBottle(undefined);
                                        }
                                    }}
                                    iconFont="playlist_add"
                                />
                            </ContainerFooter>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
            </> : null}
            <section>
                <h2>Selected Bottles</h2>
                {props.queuedBottles.length > 0 ? 
                    <GasBottleList 
                        gasBottles={{
                            data: props.queuedBottles,
                            object: '',
                            url: '',
                            data_updated_at: new Date(),
                            pages: {
                                next_url: null,
                                previous_url: null,
                                per_page: 1000
                            },
                            total_count: 0,
                        }} 
                        hideAssignedTo
                        hideRefrigerant
                        hideSupplier
                        hideStatus
                        isConsumable={props.isConsumable}
                        hasSearched={true} 
                        isGasBottlesLoading={false} 
                        perPage={1000}
                    /> :
                    <InnerContainer>
                        <NoneFound 
                            iconFont={"propane_tank"} 
                            text={"No bottles selected."}
                        />
                    </InnerContainer>
                }
            </section>
        </>
    )
}

export default SelectReturningBottles