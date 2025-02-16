import DisabledLabel from "../DisabledLabel/DisabledLabel";
import getEquipmentURL from "./utils/getEquipmentURL"

const NewEquipmentLink = (props: {
    code: string,
    text?: string,
    queryParameters?: string,
    inactive?: boolean,
}) => {
    const getLinkText = (): string => {
        if (props.text) return props.text;
        return props.code.toUpperCase();
    }
    return (
        <a 
            href={`${getEquipmentURL(props.code)}${props.queryParameters ? `?${props.queryParameters}` : ''}`}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">local_laundry_service</span> : 
                <DisabledLabel hideText/>
            }  
            <span>{getLinkText()}</span>
        </a>
    )
}

export default NewEquipmentLink