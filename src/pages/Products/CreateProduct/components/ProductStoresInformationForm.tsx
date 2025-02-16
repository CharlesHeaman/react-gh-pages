import { ChangeEvent } from "react";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { ConvertToStockProductAttributes, CreateProductAttributes } from "../../../../types/products.types";
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput";

const ProductStoresInformationForm = (props: {
    productDetails: ConvertToStockProductAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <InfoGrid>                
            <GridItem title='Stores Area' span={2}>
                <TextInput
                    name="stores_area"
                    label="Stores area"
                    value={props.productDetails.stores_area}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required
                    autoFocus
                />
            </GridItem>
            <GridItem title='Stores Rack' span={2}>
                <TextInput
                    name="stores_rack"
                    label="Stores rack"
                    value={props.productDetails.stores_rack}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required
                />
            </GridItem>
            <GridItem title='Stores Bin' span={2}>
                <TextInput
                    name="stores_bin"
                    label="Stores bin"
                    value={props.productDetails.stores_bin}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    required
                />
            </GridItem> 
            <GridItem title='Stock Level'>
                <IntegerInput
                    name="stock_level"
                    label="Stock level"
                    value={props.productDetails.stock_level}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                    maxWidth={75}
                    required
                />
            </GridItem>
            {/* <GridItem title='Alternative Stores Location' secondaryTitle="(optional)">
                <TextInput
                    name="alternative_stores_location"
                    label="Alternative stores location"
                    value={props.productDetails.alternative_stores_location}
                    updateFunc={props.updateParams}
                    hasSubmitted={props.showErrors}
                />
            </GridItem>             */}
        </InfoGrid>
    )
}

export default ProductStoresInformationForm