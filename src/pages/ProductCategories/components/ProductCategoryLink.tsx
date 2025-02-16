import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getProductCategoryURL from "../utils/getProductCategoryURL"

const ProductCategoryLink = (props: {
    productCategoryID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getProductCategoryURL(props.productCategoryID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">inventory_2</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default ProductCategoryLink