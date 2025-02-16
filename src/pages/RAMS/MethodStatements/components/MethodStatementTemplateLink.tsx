import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import getMethodStatementTemplateURL from "../utils/getMethodStatementTemplateURL"

const MethodStatementTemplateLink = (props: {
    methodStatementTemplateID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getMethodStatementTemplateURL(props.methodStatementTemplateID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">feed</span> :
                <DisabledLabel hideText/>
            } 
            <span>{props.name}</span>
        </a>
    )
}

export default MethodStatementTemplateLink