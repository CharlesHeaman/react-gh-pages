import { ChangeEvent } from "react";
import MoneyInput from "../../../../components/form/MoneyInput/MoneyInput";
import PercentageInput from "../../../../components/form/PercentageInput/PercentageInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateProductAttributes } from "../../../../types/products.types";
import formatMoney from "../../../../utils/formatMoney";
import getNettPrice from "../../utils/getNettPrice";
import getAdjustedPrice from "../../utils/getAdjustedPrice";

const ProductPriceForm = (props: {
    productDetails: CreateProductAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isUpdate?: boolean,
}) => {
    return (
        <section>
            <InfoGrid>                
                <GridItem title='List Price'>
                    <MoneyInput
                        name="price"
                        label="Price"
                        value={props.productDetails.price}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Discount' span={3}>
                    <PercentageInput
                        name="percentage_discount"
                        label="Discount"
                        value={props.productDetails.percentage_discount}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Nett Price' span={3}>
                    <p>{formatMoney(getNettPrice(parseFloat(props.productDetails.price), parseInt(props.productDetails.percentage_discount)))}</p>
                </GridItem>
                <GridItem title='Uplift' span={3}>
                    <PercentageInput
                        name="percentage_markup"
                        label="Uplift"
                        value={props.productDetails.percentage_markup}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem> 
                <GridItem title='Adjusted Price' span={3}>
                    <p>{formatMoney(getAdjustedPrice(parseFloat(props.productDetails.price), parseInt(props.productDetails.percentage_markup)))}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ProductPriceForm