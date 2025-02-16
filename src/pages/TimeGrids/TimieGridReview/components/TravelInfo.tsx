import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { CustomerResponseData } from "../../../../types/customers.types";
import { EngineerPayablePeriodResponseData } from "../../../../types/engineerPayablePeriod.types";
import { SiteResponseData } from "../../../../types/sites.types";
import { TicketResponseData } from "../../../../types/tickets.types";
import { TrackerActivityResponseData } from "../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../types/trackerSites.types";
import { UserResponseData } from "../../../../types/user.types";
import { VehicleResponseData } from "../../../../types/vehicles.types";
import EditPayablePeriod from "./EditPayablePeriod/EditPayablePeriod";
import JourneyMap from "./JourneyMap/JourneyMap";
import { TripSection } from "./JourneyMap/utils/getTripSections";

function TravelInfo(props: { 
    timegridID: number,
    userData: UserResponseData,
    date: Date,
    vehicleData: VehicleResponseData,
    activityData: Array<TrackerActivityResponseData>, 
    trackerSiteData: Array<TrackerSiteResponseData>, 
    homeSiteID: string,  
    workSiteID: string | null,  
    tickets: Array<TicketResponseData>, 
    siteData: Array<SiteResponseData>,
    customerData: Array<CustomerResponseData>,
    tripSections: Array<TripSection>,
    getTimegridActivity: () => void,
    getEngineerPayablePeriod: (userID: number, date: Date) => void,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
    engineerPayablePeriodUser: UserResponseData | undefined
}) {
    const [showJourney, setShowJourney] = useState(false);
    const [showEditPayablePeriod, setShowEditPayablePeriod] = useState(false);

    return (
        <>
            <SideBarModule title='Travel Info'>
                <SideBarButton 
                    text='View Travel' 
                    iconFont='directions_car'
                    clickEvent={() => setShowJourney(true)}
                />
                {props.activityData.length > 0 && <SideBarButton
                    text='Edit Payable Period'
                    iconFont="timeline"
                    color="orange"
                    clickEvent={() => setShowEditPayablePeriod(true)}
                />}
            </SideBarModule>

            <JourneyMap
                vehicleData={props.vehicleData}
                activityData={props.activityData}
                trackerSites={props.trackerSiteData}
                tickets={props.tickets}
                siteData={props.siteData}
                customerData={props.customerData}
                homeSiteID={props.homeSiteID}
                workSiteID={props.workSiteID}
                tripSections={props.tripSections} 
                showJourney={showJourney} 
                setShowJourney={setShowJourney}    
                engineerPayablePeriod={props.engineerPayablePeriod}    
                engineerPayablePeriodUser={props.engineerPayablePeriodUser}          
            />

            <EditPayablePeriod
                timegridID={props.timegridID}
                userData={props.userData}
                date={props.date}
                activityData={props.activityData}
                trackerSites={props.trackerSiteData}
                homeSiteID={props.homeSiteID}
                engineerPayablePeriod={props.engineerPayablePeriod}    
                show={showEditPayablePeriod}
                resFunc={() => {
                    props.getTimegridActivity();
                    props.getEngineerPayablePeriod(props.userData.id, props.date)
                }}
                hideFunc={() => {
                    setShowEditPayablePeriod(false);
                }}
            />
            
        </>
    )
}

export default TravelInfo