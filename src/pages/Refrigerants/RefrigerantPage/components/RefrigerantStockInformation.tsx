    import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../../components/ui/General/Label/Label"
import { ProductResponseData } from "../../../../types/products.types"
import ProductLink from "../../../Products/components/ProductLink"
import StockLevelLabel from "../../../Products/components/StockLevelLabel"

const RefrigerantStockInformation = (props: {
    product: ProductResponseData | undefined,
    preview?: boolean
}) => {
    return (
        <section>
            <h2>Stock Information</h2>
            <InfoGrid>
                <GridItem title='Product'>
                    <p>{props.product ? 
                        <ProductLink 
                            productID={props.product.id} 
                            description={props.product.data.description}
                            isStock={props.product.data.is_stock}
                        /> : 
                        <Label text="None" iconFont="not_interested" color="grey"/>
                    }</p>
                </GridItem>
                {!props.preview && <>
                    <GridItem title='Stock Level' span={3}>
                        <p>{props.product ? 
                            <StockLevelLabel stockLevel={props.product.data.stock_level} orderThreshold={props.product.data.order_threshold}/> : 
                            <Label text="N/A" color="grey"/>
                        }</p>
                    </GridItem>
                    <GridItem title='Order Threshold' span={3}>
                        <p>{props.product ? 
                            props.product.data.order_threshold ? 
                                props.product.data.order_threshold : 
                                'None' 
                            : 
                            <Label text="N/A" color="grey"/>
                        }</p>
                    </GridItem>
                </>}
            </InfoGrid>
        </section>
    )
}

export default RefrigerantStockInformation