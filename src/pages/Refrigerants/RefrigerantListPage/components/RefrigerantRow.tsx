import Label from "../../../../components/ui/General/Label/Label"
import RefrigerantLink from "../../../../components/ui/Links/RefrigerantLink"
import { ProductResponseData } from "../../../../types/products.types"
import { RefrigerantResponseData } from "../../../../types/refrigerant.types"
import ProductLink from "../../../Products/components/ProductLink"
import StockLevelLabel from "../../../Products/components/StockLevelLabel"
import RefrigerantGasAirTypeLabel from "../../RefrigerantPage/components/RefrigerantGasAirTypeLabel"

const RefrigerantRow = (props: {
    refrigerant: RefrigerantResponseData,
    product: ProductResponseData | undefined
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <RefrigerantLink 
                        name={props.refrigerant.data.name} 
                        refrigerantID={props.refrigerant.id}
                        inactive={!props.refrigerant.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.refrigerant.data.common_name}</td>
            <td><RefrigerantGasAirTypeLabel isConsumable={props.refrigerant.data.is_consumable}/></td>
            <td className="text-right">{props.refrigerant.data.global_warming_potential}</td>
            <td className="text-left">{props.product ? 
                <ProductLink 
                    productID={props.product.id} 
                    description={props.product.data.description}
                    isStock={props.product.data.is_stock}
                /> : 
                <Label text="None" iconFont="not_interested" color="grey"/>
            }</td>
            <td>{props.product ? 
                <StockLevelLabel stockLevel={props.product.data.stock_level} orderThreshold={props.product.data.order_threshold}/> : 
                <Label text="N/A" color="grey"/>
            }</td>
        </tr>
    )
}

export default RefrigerantRow