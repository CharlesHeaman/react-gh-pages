import Label from "../../../../components/ui/General/Label/Label"
import formatDate from "../../../../utils/formatDate";

function SnapShots(props) {
    return (
        <table className="selectTable">
            <thead>
                <tr>
                    <th>Ignition</th>
                    <th>Name</th>
                    <th>Engineer</th>
                    <th>Group</th>
                    <th>Time</th>
                    <th>Site</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {props.snapShotData.map((snapShot, index) =>
                    <tr 
                        className={props.currentVehicleID === snapShot.vehicle.id ? 'selectedRow' : ''}
                        onClick={() => props.setCurrentVehicleID(snapShot.vehicle.id)}
                        key={index}
                    >
                        <td>
                            {snapShot.ignitionOn ?
                                <Label text='On' color='light-green'/> :
                                <Label text='Off' color='red'/>
                            }
                        </td>
                        <td className="text-left">
                            {snapShot.vehicle.tracker && <Label text={snapShot.vehicle.tracker.name} color='grey'/>}
                        </td>
                        <td className="text-left" style={{
                            whiteSpace: 'nowrap'
                        }}>
                            {snapShot.vehicle.driver && snapShot.vehicle.driver.fullName}
                        </td>
                        <td className="text-left">
                            {snapShot.vehicle.group && <Label text={snapShot.vehicle.group.name} customColour={snapShot.vehicle.group.labelColor}/>}
                        </td>
                        <td className="text-left" style={{ whiteSpace: 'nowrap' }}>
                            {`${formatDate(snapShot.date)} ${snapShot.date.split('T')[1]}`}
                        </td>
                        <td>
                            {props.siteData.find((site) => site.id === snapShot.site.id) ? 
                                <Label text={props.siteData.find((site) => site.id === snapShot.site.id).name} color='grey'/> : 
                                null
                            }
                        </td>
                        <td className="text-left" style={{
                            whiteSpace: 'nowrap'
                        }}>{snapShot.loc}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default SnapShots