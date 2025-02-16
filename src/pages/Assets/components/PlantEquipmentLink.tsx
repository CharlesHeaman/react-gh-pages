import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getPlantEquipmentURL from "../utils/getPlantEquipmentURL"

const PlantEquipmentLink = (props: {
    code: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getPlantEquipmentURL(props.code)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">handyman</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.code}</span>
        </a>
    )
}

export default PlantEquipmentLink