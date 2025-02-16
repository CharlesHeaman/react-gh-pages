import Label from "../../../../../components/ui/General/Label/Label"
import styles from "./MapVanInfoWindow.module.css"
import { ReactComponent as DriverImg } from './../../../../../assets/images/person_black_24dp.svg';
import { ReactComponent as LocImg } from './../../../../../assets/images/location_on_black_24dp.svg';
import { ReactComponent as SiteImg } from './../../../../../assets/images/business_black_24dp.svg';


const MapVanInfoWindow = (props) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                {props.snapShot.ignitionOn ?
                    <Label text='On' color='light-green'/> :
                    <Label text='Off' color='red'/>
                }
                {props.snapShot.vehicle.tracker && <Label text={props.snapShot.vehicle.tracker.name} color='grey'/>}
                {props.snapShot.vehicle.group && <Label text={props.snapShot.vehicle.group.name} customColour={props.snapShot.vehicle.group.labelColor}/>}
            </div>
            <div className={styles['body']}>
                {props.snapShot.vehicle.tracker && <div className={styles['data-icon']}>
                    <DriverImg/>
                    <p>{props.snapShot.vehicle.tracker && props.snapShot.vehicle.tracker.name}</p>
                </div>}
                {props.site ? 
                    <div className={styles['data-icon']}>
                        <SiteImg/>
                        <Label text={props.site} color='grey'/>
                    </div> : null
                }
                <div className={styles['data-icon']}>
                    <LocImg/>
                    <p>{props.snapShot.loc}</p>
                </div>
            </div>
        </div>
    )
}

export default MapVanInfoWindow