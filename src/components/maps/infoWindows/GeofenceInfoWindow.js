import Label from "../../ui/General/Label/Label";
import formatTime from "../../../utils/formatTime";
import { ReactComponent as SiteImg } from './../../../assets/images/business_black_24dp.svg';
import { ReactComponent as LocImg } from './../../../assets/images/location_on_black_24dp.svg';
import { ReactComponent as TimeImg } from './../../../assets/images/timer_black_24dp.svg';
import InfoWindowContainer from "./InfoWindowContainer/InfoWindowContainer";
import DataIconPair from "./InfoWindowContainer/components/DataIconPair/DataIconPair";

const GeofenceInfoWindow = (props) => {
    return (
        <InfoWindowContainer
            headerContent={
                <>
                    <Label text='Geofence' color='orange'/>
                    <DataIconPair
                        data={<p>{formatTime(props.date)}</p>}
                        icon={<TimeImg/>}
                    />
                </>
            }
            bodyContent={
                <>
                    {props.site ? 
                        <DataIconPair
                            data={<Label text={props.site} color='grey'/>}
                            icon={<SiteImg/>}
                        /> : null
                    }
                    <DataIconPair
                        data={<p>{props.loc}</p>}
                        icon={<LocImg/>}
                    />
                </>
            }
        />
    )
}

export default GeofenceInfoWindow