import formatTime from "../../../utils/formatTime";
import Label from "../../ui/General/Label/Label";
import { ReactComponent as SiteImg } from './../../../assets/images/business_black_24dp.svg';
import { ReactComponent as LocImg } from './../../../assets/images/location_on_black_24dp.svg';
import { ReactComponent as TimeImg } from './../../../assets/images/timer_black_24dp.svg';
import DataIconPair from "./InfoWindowContainer/components/DataIconPair/DataIconPair";
import InfoWindowContainer from "./InfoWindowContainer/InfoWindowContainer";

const OnSiteInfoWindow = (props) => {
    return (
        <InfoWindowContainer
            headerContent={
                <>
                    {props.isHome ? 
                        <Label text='Home' color='light-blue'/> :
                        <Label text='On-site' color='dark-blue'/>
                    }
                    <DataIconPair
                        data={<p>{formatTime(props.start)} - {formatTime(props.end)}</p>}
                        icon={<TimeImg/>}
                    />
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
                        data={<p>{props.loc}</p>}
                        icon={<LocImg/>}
                    />
                </>
            }
        />
    )
}

export default OnSiteInfoWindow