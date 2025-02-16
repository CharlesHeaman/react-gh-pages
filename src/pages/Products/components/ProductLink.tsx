import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel";
import getProductURL from "../utils/getProductURL"

const ProductLink = (props: {
    productID: number,
    description?: string,
    inactive?: boolean,
    isStock?: boolean,
    isSundry?: boolean,
}) => {
    const getLinkText = (): string => {
        if (props.description) return props.description;
        return `${props.productID}`;
    }
    return (
        <a 
            href={getProductURL(props.productID)}
            className={"icon-link"}
        >
            {!props.inactive ?
                <span className="material-icons">{props.isStock ? 'inbox' : !props.isSundry ? 'inventory_2' : 'donut_small'}</span> :
                <DisabledLabel hideText/>
            }  
            <span>{getLinkText()}</span>
        </a>
    )
}

export default ProductLink