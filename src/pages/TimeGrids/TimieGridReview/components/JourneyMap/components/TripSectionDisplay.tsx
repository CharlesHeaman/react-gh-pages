import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import Label from "../../../../../../components/ui/General/Label/Label";
import formatHours from "../../../../../../utils/formatHours";
import formatHoursMinutes from "../../../../../../utils/formatHoursMinutes";
import formatMiles from "../../../../../../utils/formatMiles";
import formatTime from "../../../../../../utils/formatTime";
import { ReactComponent as SiteImg } from './../../../../../../assets/images/business_black_24dp.svg';
import { ReactComponent as TravelImg } from './../../../../../../assets/images/directions_car_black_24dp.svg';
import { ReactComponent as GeoImg } from './../../../../../../assets/images/my_location_black_24dp.svg';
import { ReactComponent as TimeImg } from './../../../../../../assets/images/timer_black_24dp.svg';
import { ReactComponent as HomeImg } from './../../../../../../assets/images/home_black_24dp.svg';

import styles from './TripSection.module.css';
import { TripSection } from "../utils/getTripSections";
import { Dispatch, SetStateAction } from "react";
import getSiteLabel from "./getSiteLabel";
import { TrackerSiteResponseData } from "../../../../../../types/trackerSites.types";

function TripSectionDisplay(props: { 
    sites: Array<TrackerSiteResponseData>,
    homeSiteID: string, 
    workSiteID: string | null,
    section: TripSection, 
    currentSectionIndex: number,
    setCurrentSectionIndex: Dispatch<SetStateAction<number>>,
    resetSelection: () => void,
    index: number
}) {
    function getLabel(type: string) {
        switch (type) {
            case 'Geofence':
                return <Label text='Geofence' icon={<GeoImg/>} color={getHighlightColor(type)}/>
            case 'Travel':
                return <Label text={type} icon={<TravelImg/>} color={getHighlightColor(type)}/>
            case 'On-site':
                return <Label text={type} icon={<SiteImg/>} color={getHighlightColor(type)}/>
            case 'Home': 
                return <Label text={type} icon=<HomeImg/> color={getHighlightColor(type)}/>
        }
    }

    function getHighlightColor(type: string) {
        switch (type) {
            case 'Geofence':
                return 'orange'
            case 'Travel':
                return 'purple'
            case 'On-site':
                return 'dark-blue'
            case 'Home':
                return 'light-blue'
            default: 
                return 'grey'
        }
    }
    
    return (
        <div 
            className={`
                ${styles['section']} 
                ${getHighlightColor(props.section.type)} 
                ${props.section.isPayable ? styles['payable'] : ''}
                ${props.currentSectionIndex === props.index ? styles['selected'] : ''}
            `}
            onClick={() => { 
                props.resetSelection()
                props.setCurrentSectionIndex(props.index);
            }}
        >
            <div className={styles['section-header']}>
                {getLabel(props.section.type)}
                <div className="flex">
                    <TimeImg/>
                    {props.section.end ? 
                        <p>{formatTime(props.section.start)} - {formatTime(props.section.end)}</p> :
                        <p>{formatTime(props.section.start)}</p>
                    }
                </div>
            </div>
            <div>
                <InfoGrid>
                    {props.section.start && props.section.end && <GridItem title={`${props.section.type} Time`} span='3'>
                        <p>{`${formatHours(new Date(new Date(props.section.end).getTime() - new Date(props.section.start).getTime()).getTime() / (60 * 60 * 1000))} hrs`} ({formatHoursMinutes(new Date(new Date(props.section.end).getTime() - new Date(props.section.start).getTime()).getTime() / (60 * 60 * 1000))})</p>
                    </GridItem>}
                    {props.section.distance !== undefined && <GridItem title='Distance' span='3'>
                        <p>{formatMiles(props.section.distance)} mi ({Math.round((props.section.distance + Number.EPSILON) * 10) / 10} mi)</p>
                    </GridItem>}
                    {props.section.startSiteName && <GridItem title='Start Site' span='3'>
                        {getSiteLabel(props.section.startSiteID, props.sites, props.homeSiteID, props.workSiteID)}
                    </GridItem>}
                    {props.section.endSiteName && <GridItem title='End Site' span='3'>
                        {getSiteLabel(props.section.endSiteID, props.sites, props.homeSiteID, props.workSiteID)}
                    </GridItem>}
                    {props.section.siteName && <GridItem title='Site' span='3'>
                        {getSiteLabel(props.section.siteID, props.sites, props.homeSiteID, props.workSiteID)}
                    </GridItem>}
                    {props.section.loc && <GridItem title='Location'>
                        <p>{props.section.loc}</p>
                    </GridItem>}
                </InfoGrid>
            </div>
        </div>
    )
}

export default TripSectionDisplay