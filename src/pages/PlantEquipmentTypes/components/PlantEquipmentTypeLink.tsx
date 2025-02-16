import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getPlantEquipmentTypeURL from "../utils/getPlantEquipmentTypeURL"

const PlantEquipmentTypeLink = (props: {
    plantEquipmentTypeID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getPlantEquipmentTypeURL(props.plantEquipmentTypeID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">handyman</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default PlantEquipmentTypeLink