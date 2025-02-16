import { Dispatch, SetStateAction } from "react"
import IntegerInput from "../../../../../../../../components/form/IntegerInput/IntegerInput"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"

const SetProductOrderThresholdForm = (props: {
    threshold: number
    setThreshold: Dispatch<SetStateAction<number>>,
    showErrors: boolean
}) => {
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem>
                        <p>Enter a new reorder level for this product.</p>
                    </GridItem>
                    <GridItem title='Reorder Level'>
                        <IntegerInput
                            name="threshold"
                            label="Reorder level"
                            value={props.threshold.toString()}
                            updateFunc={(event) => props.setThreshold(parseInt(event.target.value))}
                            required
                            autoFocus
                            hasSubmitted={props.showErrors}
                            maxWidth={100}
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default SetProductOrderThresholdForm