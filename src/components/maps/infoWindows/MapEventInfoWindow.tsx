import { ReactComponent as OnImg } from './../../../assets/images/check_circle_black_24dp.svg';
import { ReactComponent as OffImg } from './../../../assets/images/cancel_black_24dp.svg';
import { ReactComponent as GeoImg } from './../../../assets/images/my_location_black_24dp.svg';
import { ReactComponent as TimeImg } from './../../../assets/images/timer_black_24dp.svg';
import { ReactComponent as LocImg } from './../../../assets/images/location_on_black_24dp.svg';
import { ReactComponent as SiteImg } from './../../../assets/images/business_black_24dp.svg';
import Label from "../../ui/General/Label/Label";
import InfoWindowContainer from './InfoWindowContainer/InfoWindowContainer';
import DataIconPair from './InfoWindowContainer/components/DataIconPair/DataIconPair';
import { TrackerActivityResponseData } from '../../../types/trackerActivity.types';
import formatTime from '../../../utils/formatTime';
import { ReactNode } from 'react';

const MapEventInfoWindow = (props: { activity: TrackerActivityResponseData, siteLabel: ReactNode | null }) => {
    function getLabel(type: string) {
        switch (type) {
            case 'Ignition On':
                return <Label text={type} icon={<OnImg/>} color='light-green' hideIcon/>
            case 'Ignition Off':
                return <Label text={type} icon={<OffImg/>} color='red' hideIcon/>
            case 'Geofence Entered':
                return <Label text={type} icon={<GeoImg/>} color='orange' hideIcon/>
            default: 
                return null
        }
    }
    return (
        <InfoWindowContainer
            headerContent={
                <>
                    {getLabel(props.activity.data.event)}
                    <div>
                        <TimeImg/>
                    </div>
                    <p>{formatTime(props.activity.data.date)}</p>
                </>
            }
            bodyContent={
                <>
                    {props.siteLabel ? 
                        <DataIconPair
                            data={props.siteLabel}
                            icon={<SiteImg/>}
                        /> : null
                    }
                    <DataIconPair
                        data={<p>{props.activity.data.loc}</p>}
                        icon={<LocImg/>}
                    />
                </>
            }
        />
    )
}

export default MapEventInfoWindow