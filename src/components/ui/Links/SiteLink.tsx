import DisabledLabel from "../DisabledLabel/DisabledLabel";
import getSiteURL from "./utils/getSiteURL"

const SiteLink = (props: {
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
        return props.code.toUpperCase();
    }

    return (
        <a 
            href={`${getSiteURL(props.code)}${props.queryParameters ? `?${props.queryParameters}` : ''}`}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">{!props.listIcon ? 'business' : 'wysiwyg'}</span> :
                <DisabledLabel hideText/>
            }  
            <span>{getLinkText()}</span>
        </a>
    )
}

export default SiteLink