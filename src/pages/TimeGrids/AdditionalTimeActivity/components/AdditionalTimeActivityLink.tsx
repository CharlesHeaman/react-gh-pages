import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import getAdditionalTimeActivityURL from "../utils/getAdditionalTimeActivityURL"

const AdditionalTimeActivityLink = (props: {
    additionalTimeActivityID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getAdditionalTimeActivityURL(props.additionalTimeActivityID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">more_time</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default AdditionalTimeActivityLink