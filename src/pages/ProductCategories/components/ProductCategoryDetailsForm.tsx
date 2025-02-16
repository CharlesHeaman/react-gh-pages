import { ChangeEvent } from "react"
import TextInput from "../../../components/form/TextInput/TextInput"
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateProductCategoryAttributes } from "../../../types/productCategory.types"

const ProductCategoryDetailsForm = (props: {
    productCategoryDetails: CreateProductCategoryAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Product Category Details</h2>}
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.productCategoryDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaInput
                        name="description"
                        value={props.productCategoryDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ProductCategoryDetailsForm 