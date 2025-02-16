import { ChangeEvent } from "react"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateSundryProductAttributes } from "../../../../../../../../types/products.types"
import TextInput from "../../../../../../../../components/form/TextInput/TextInput"
import PercentageInput from "../../../../../../../../components/form/PercentageInput/PercentageInput"

const CreateSundryProductForm = (props: {
    productDetails: CreateSundryProductAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean
}) => {
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem>
                        <p>All other information will be copied from this product.</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <TextInput
                            name="description"
                            label="Description"
                            value={props.productDetails.description}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            autoFocus
                            required
                        />
                    </GridItem>
                    <GridItem title='Size or Model' span={3}>
                        <TextInput
                            name="size_or_model"
                            label="Size or model"
                            value={props.productDetails.size_or_model}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Unit' span={3}>
                        <TextInput
                            name="unit"
                            label="Unit"
                            value={props.productDetails.unit}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Price Percentage'>
                        <PercentageInput
                            name="parent_price_percentage"
                            label="Price percentage"
                            value={props.productDetails.parent_price_percentage}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CreateSundryProductForm