import DisabledLabel from "../DisabledLabel/DisabledLabel"
import getRefrigerantURL from "./utils/getRefrigerantURL"

const RefrigerantLink = (props: {
    refrigerantID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getRefrigerantURL(props.refrigerantID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">propane</span> :
                <DisabledLabel hideText/>
            }   
            <span>{props.name}</span>
        </a>
    )
}

export default RefrigerantLink