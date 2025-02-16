import { ProductCategoryResponseData } from "../../../types/productCategory.types"
import ProductCategoryLink from "./ProductCategoryLink"


const ProductCategoryRow = (props: {
    productCategory: ProductCategoryResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <ProductCategoryLink     
                        productCategoryID={props.productCategory.id}  
                        name={props.productCategory.data.name}
                        inactive={!props.productCategory.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.productCategory.data.description ? props.productCategory.data.description : 'None'}</td>
        </tr>
    )
}

export default ProductCategoryRow