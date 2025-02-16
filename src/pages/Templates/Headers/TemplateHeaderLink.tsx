import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getTemplateHeaderURL from "./utils/getTemplateHeaderURL"

const TemplateHeaderLink = (props: {
    templateHeaderID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getTemplateHeaderURL(props.templateHeaderID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">vertical_align_top</span> :
                <DisabledLabel hideText/>
            } 
            <span>{props.name}</span>
        </a>
    )
}

export default TemplateHeaderLink