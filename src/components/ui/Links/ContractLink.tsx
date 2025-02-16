import DisabledLabel from "../DisabledLabel/DisabledLabel";
import getContractURL from "./utils/getContractURL"
var encodeUrl = require('encodeurl')

const ContractLink = (props: {
    referenceNumber: string,
    text?: string,
    queryParameters?: string,
    listIcon?: boolean,
    inactive?: boolean,
}) => {
    const getLinkText = (): string => {
        if (props.text) return props.text;
        return props.referenceNumber
    }

    return (
        <a 
            href={`${getContractURL(encodeUrl(props.referenceNumber).replaceAll('/', '%2F'))}${props.queryParameters ? `?${props.queryParameters}` : ''}`}
            className="icon-link"
        >
             {!props.inactive ?
                <span className="material-icons">{!props.listIcon ? 'history_edu' : 'wysiwyg'}</span> :
                <DisabledLabel hideText/>
            }  
            <span>{getLinkText()}</span>
        </a>
    )
}

export default ContractLink