import Label from "../../ui/General/Label/Label";
import formatTime from "../../../utils/formatTime";
import { ReactComponent as SiteImg } from './../../../assets/images/business_black_24dp.svg';
import { ReactComponent as LocImg } from './../../../assets/images/location_on_black_24dp.svg';
import { ReactComponent as TimeImg } from './../../../assets/images/timer_black_24dp.svg';
import InfoWindowContainer from "./InfoWindowContainer/InfoWindowContainer";
import DataIconPair from "./InfoWindowContainer/components/DataIconPair/DataIconPair";

const TravelInfoWindow = (props) => {
    return (
        <InfoWindowContainer
            headerContent={
                <>
                    <Label text='Travel' color='purple'/>
                    <div>
                        <TimeImg/>
                    </div>
                    <p>{formatTime(props.start)} - {formatTime(props.end)}</p>
                </>
            }
            bodyContent={
                <>
                    {props.startSiteLabel ? 
                        <DataIconPair
                            data={props.startSiteLabel}
                            icon={<SiteImg/>}
                        /> : null
                    }
                    <DataIconPair
                        data={<p>{props.startLoc}</p>}
                        icon={<LocImg/>}
                    />
                    <div style={{
                        borderTop: '1px solid var(--high-contrast)',
                        margin: 'var(--small-gap) 0px'
                    }}></div>
                    {props.endSiteLabel ? 
                        <DataIconPair
                            data={props.endSiteLabel}
                            icon={<SiteImg/>}
                        /> : null
                    }
                    <DataIconPair
                        data={<p>{props.endLoc}</p>}
                        icon={<LocImg/>}
                    />
                </>
            }
        />
    )
}

export default TravelInfoWindow