import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getEquipmentTypeURL from "../utils/getEquipmentTypeURL"

const EquipmentTypeLink = (props: {
    equipmentTypeID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getEquipmentTypeURL(props.equipmentTypeID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">local_laundry_service</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default EquipmentTypeLink