import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getTemplateFooterURL from "./utils/getTemplateFooterURL"

const TemplateFooterLink = (props: {
    templateFooterID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getTemplateFooterURL(props.templateFooterID)}
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

export default TemplateFooterLink