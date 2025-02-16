import Label from "../../../components/ui/General/Label/Label"
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink"
import { ProductCategoryResponseData } from "../../../types/productCategory.types"
import { ProductResponseData } from "../../../types/products.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import formatMoney from "../../../utils/formatMoney"
import ProductLink from "./ProductLink"
import StockLevelLabel from "./StockLevelLabel"
import styles from './ActionIconButton.module.css';
import getNettPrice from "../utils/getNettPrice"
import getAdjustedPrice from "../utils/getAdjustedPrice"

const ProductRow = (props: {
    product: ProductResponseData,
    supplier: SupplierManufacturerResponseData | undefined,
    manufacturer: SupplierManufacturerResponseData | undefined,
    productCategory: ProductCategoryResponseData | undefined,
    hideCategory?: boolean,
    hideSupplier?: boolean,
    showAdd?: boolean,
    addFunc?: (product: ProductResponseData) => void
}) => {
    const nettPrice = getNettPrice(props.product.data.price, props.product.data.percentage_discount);
    const adjustedPrice = getAdjustedPrice(props.product.data.price, props.product.data.percentage_markup);

    return (
        <tr>
            {props.showAdd && <td>
                <summary
                    className={`${styles['action-icon-button']} light-green no-select`}
                    onClick={() => props.addFunc && props.addFunc(props.product)}
                >
                    <span className="material-icons">add</span>
                </summary>
            </td>}
            <td className="text-left">
                <div className="flex">
                    <ProductLink 
                        productID={props.product.id}
                        inactive={!props.product.data.is_active}
                        isStock={props.product.data.is_stock}
                        isSundry={props.product.data.is_sundry}
                    />
                </div>
            </td>
            {!props.hideCategory ? <td style={{ textAlign: 'left'}}><Label text={props.productCategory?.data.name} iconFont="inventory_2" color="no-color"/></td> : null}
            <td style={{ textAlign: 'left'}}>{props.product.data.description}</td>
            <td style={{ textAlign: 'left'}}>{props.product.data.size_or_model}</td>
            <td style={{ textAlign: 'left'}}>{props.product.data.unit}</td>
            {!props.hideSupplier ? <td className="text-left">{props.supplier ? <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/> : null}</td> : null}
            <td className="text-left">{props.product.data.catalogue_number}</td>
            <td className="text-right">{formatMoney(props.product.data.price)}</td>
            <td className="text-right">{nettPrice < props.product.data.price ? <Label text={formatMoney(nettPrice)} color='red' iconFont='discount'/> : formatMoney(nettPrice)}</td>
            <td className="text-right">{adjustedPrice > props.product.data.price ? <Label text={formatMoney(adjustedPrice)} color='light-green' iconFont='arrow_circle_up'/> : formatMoney(adjustedPrice)}</td>
            <td>{props.product.data.is_stock && !props.product.data.is_sundry ?
                <StockLevelLabel stockLevel={props.product.data.stock_level} orderThreshold={props.product.data.order_threshold}/> :
                <Label text="N/A" color="grey"/>
            }</td>
        </tr>
    )
}

export default ProductRow