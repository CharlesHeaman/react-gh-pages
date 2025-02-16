import DisabledLabel from "../DisabledLabel/DisabledLabel";
import getSupplierManufacturerURL from "./utils/getSupplierManufacturerURL"

const SupplierManufacturerLink = (props: {
    code: string,
    name?: string,
    text?: string,
    queryParameters?: string,
    listIcon?: boolean,
    inactive?: boolean,
}) => {
    const getLinkText = (): string => {
        if (props.text) return props.text;
        if (props.name) return `${props.name} (${props.code})`;
        return props.code;
    }
    return (
        <a 
            href={`${getSupplierManufacturerURL(props.code)}${props.queryParameters ? `?${props.queryParameters}` : ''}`}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">{!props.listIcon ? 'warehouse' : 'wysiwyg'}</span> : 
                <DisabledLabel hideText/>
            }  
            <span>{getLinkText()}</span>
        </a>
    )
}

export default SupplierManufacturerLink