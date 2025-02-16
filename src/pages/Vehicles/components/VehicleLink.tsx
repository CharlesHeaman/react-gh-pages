import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getVehicleURL from "../utils/getVehicleURL"

const VehicleLink = (props: {
    vehicleID: number,
    registrationNumber: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getVehicleURL(props.vehicleID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">directions_car</span> :
                <DisabledLabel hideText/>
            }   
            <span>{props.registrationNumber}</span>
        </a>
        
    )
}

export default VehicleLink