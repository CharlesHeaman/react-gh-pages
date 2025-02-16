/* eslint-disable default-case */
import { Dispatch, SetStateAction, useState } from "react";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import FilterSelect, { FilterSelection } from "../../../../../components/ui/FilterSelect/FilterSelect";
import NoneFound from "../../../../../components/ui/General/NoneFound/NoneFound";
import { CustomerResponseData } from "../../../../../types/customers.types";
import { EngineerPayablePeriodResponseData } from "../../../../../types/engineerPayablePeriod.types";
import { SiteResponseData } from "../../../../../types/sites.types";
import { TicketResponseData } from "../../../../../types/tickets.types";
import { TrackerActivityResponseData } from "../../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../../types/trackerSites.types";
import { UserResponseData } from "../../../../../types/user.types";
import { VehicleResponseData } from "../../../../../types/vehicles.types";
import CalculatedTimeDescription from "../CalculatedTravel/CalculatedTimeDescription";
import JourneyEvents from "./components/JourneyEvents";
import Map from './components/Map/Map';
import TripSectionDisplay from "./components/TripSectionDisplay";
import styles from './JourneyMap.module.css';
import getPayableEvents from "./utils/getPayableEvents";
import { TripSection } from "./utils/getTripSections";

function JourneyMap(props: { 
    vehicleData: VehicleResponseData,
    activityData: Array<TrackerActivityResponseData>, 
    trackerSites: Array<TrackerSiteResponseData>, 
    homeSiteID: string, 
    workSiteID: string | null,
    tickets: Array<TicketResponseData>, 
    siteData: Array<SiteResponseData>,
    customerData: Array<CustomerResponseData>,
    tripSections: Array<TripSection>,
    showJourney: boolean,
    setShowJourney: Dispatch<SetStateAction<boolean>>,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
    engineerPayablePeriodUser: UserResponseData | undefined
}) {
    const [currentActivityID, setCurrentActivityID] = useState<string>('');
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(-1);
    const [currentTicketIndex, setCurrentTicketIndex] = useState<number>(-1);
    const [filterSelection, setFilterSelection] = useState<Array<FilterSelection>>([
        {
            text: 'Events',
            iconFont: 'list_alt',
            selected: true,
            value: undefined
        }, 
        {
            text: 'On-Site/Travel',
            value: [1],
            iconFont: 'domain'
        }
    ])

    const isEventsMode = filterSelection.findIndex(filter => filter.selected) === 0;

    let eventsArray = props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event));

    const eventsPayable = getPayableEvents(props.activityData, props.homeSiteID, props.engineerPayablePeriod);  

    const resetSelection = () => {
        setCurrentActivityID('');
        setCurrentSectionIndex(-1);
        setCurrentTicketIndex(-1);
    }

    const trackerActivityFound = props.activityData.length > 0;

    return (
        <WindowOverlay
            title='Travel Info'
            show={props.showJourney} 
            maxWidth={trackerActivityFound ? 2000 : 500} 
            hideFunc={() => props.setShowJourney(false)}
        >           
            {trackerActivityFound ?
                <>
                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <CalculatedTimeDescription
                            vehicleData={props.vehicleData} 
                            eventsPayable={eventsPayable} 
                            eventsArray={eventsArray} 
                            homeSiteID={props.homeSiteID} 
                            engineerPayablePeriod={props.engineerPayablePeriod}    
                            engineerPayablePeriodUser={props.engineerPayablePeriodUser}             
                        /> 
                        <FilterSelect
                            selections={filterSelection} 
                            selectionSetter={setFilterSelection}                            
                        />
                    </div> 
                    <div className={styles['page-wrapper']}>
                        <div className={styles['snapshot-wrapper']}>
                            {!isEventsMode ? 
                                props.tripSections.map((section, index) => 
                                    <TripSectionDisplay
                                        section={section}
                                        sites={props.trackerSites}
                                        homeSiteID={props.homeSiteID}
                                        workSiteID={props.workSiteID}
                                        currentSectionIndex={currentSectionIndex}
                                        setCurrentSectionIndex={setCurrentSectionIndex}
                                        resetSelection={resetSelection}
                                        index={index}
                                        key={index}
                                    />
                                ) :
                                <JourneyEvents
                                    activityData={props.activityData}
                                    sites={props.trackerSites}
                                    homeSiteID={props.homeSiteID}
                                    workSiteID={props.workSiteID}
                                    currentActivityID={currentActivityID}
                                    setCurrentActivityID={setCurrentActivityID}
                                    resetSelection={resetSelection}
                                    engineerPayablePeriod={props.engineerPayablePeriod}  
                                />
                            }
                        </div>
                        <div className={styles['map-wrapper']}>
                            <Map
                                activityData={props.activityData}
                                trackerSites={props.trackerSites} 
                                sites={props.trackerSites}
                                homeSiteID={props.homeSiteID}
                                workSiteID={props.workSiteID}
                                tickets={props.tickets}
                                siteData={props.siteData}
                                customerData={props.customerData}
                                currentActivityID={currentActivityID}
                                currentTicketIndex={currentTicketIndex}
                                setCurrentTicketIndex={setCurrentTicketIndex}
                                currentSectionIndex={currentSectionIndex}
                                resetSelection={resetSelection}
                                eventsMode={isEventsMode}
                                tripSections={props.tripSections}
                            />
                        </div>
                    </div>
                </> :
                <NoneFound
                    text="No Tracker Activity Found"
                    iconFont="directions_car"
                />
            }   
        </WindowOverlay>
    )
}

export default JourneyMap