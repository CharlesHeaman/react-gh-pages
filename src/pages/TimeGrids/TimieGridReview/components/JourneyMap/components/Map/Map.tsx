import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import DataIconPair from "../../../../../../../components/maps/infoWindows/InfoWindowContainer/components/DataIconPair/DataIconPair";
import InfoWindowContainer from "../../../../../../../components/maps/infoWindows/InfoWindowContainer/InfoWindowContainer";
import MapEventInfoWindow from "../../../../../../../components/maps/infoWindows/MapEventInfoWindow";
import OnSiteInfoWindow from "../../../../../../../components/maps/infoWindows/OnSiteInfoWindow";
import TravelInfoWindow from "../../../../../../../components/maps/infoWindows/TravelInfoWindow";
import Label from "../../../../../../../components/ui/General/Label/Label";
import { ReactComponent as LocImg } from './../../../../../../../assets/images/place_black_24dp.svg';
import { TrackerActivityResponseData } from "../../../../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../../../../types/trackerSites.types";
import MapTickets from "./components/MapTickets";
import formatTime from "../../../../../../../utils/formatTime";
import { TripSection } from "../../utils/getTripSections";
import GeofenceInfoWindow from "../../../../../../../components/maps/infoWindows/GeofenceInfoWindow";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import { SiteResponseData } from "../../../../../../../types/sites.types";
import { CustomerResponseData } from "../../../../../../../types/customers.types";
import getSiteLabel from "../getSiteLabel";

function Map(props: { 
    activityData: Array<TrackerActivityResponseData>, 
    trackerSites: Array<TrackerSiteResponseData>, 
    sites: Array<TrackerSiteResponseData>,
    homeSiteID: string, 
    workSiteID: string | null, 
    tickets: Array<TicketResponseData>,
    siteData: Array<SiteResponseData>,
    customerData: Array<CustomerResponseData>,
    currentActivityID: string,
    currentTicketIndex: number,
    setCurrentTicketIndex: Dispatch<SetStateAction<number>>,
    currentSectionIndex: number,
    eventsMode: boolean,
    tripSections: Array<TripSection>,
    resetSelection: () => void
}) {
    const [map, setMap] = useState();
    const [showHomeInfo, setShowHomeInfo] = useState(false);
    const [showGeofenceInfo, setShowGeofenceInfo] = useState(false);


    const resetMarkers = () => {
        setShowHomeInfo(false);
        setShowGeofenceInfo(false);
    }

    useEffect(() => {
        resetMarkers();
    }, [props.currentActivityID, props.currentTicketIndex, props.currentSectionIndex])

    let homeCount = 0;
    let geofenceCount = 0;
    let eventsPayable: Array<boolean> = [];
    let payFromGeofence = props.activityData.filter((activity) => activity.data.event === "Geofence Entered").length >= 2;
    for (let eventIndex = 0; eventIndex < props.activityData.length; eventIndex++) {
        if (props.activityData[eventIndex].data.event === 'Geofence Entered') geofenceCount++;
        if (props.activityData[eventIndex].data.site_id === props.homeSiteID && (props.activityData[eventIndex].data.event === 'Ignition On' || props.activityData[eventIndex].data.event === 'Ignition Off')) homeCount++;
        eventsPayable.push(payFromGeofence ? 
            geofenceCount === 1 || (geofenceCount === 2 && props.activityData[eventIndex].data.event === 'Geofence Entered') :
            homeCount < 3
        )
    }

    let homeEvent = props.activityData.find((activity) => activity.data.event === "Ignition On" && activity.data.site_id === props.homeSiteID);
    let geofenceEvent = props.activityData.find((activity) => activity.data.event === "Geofence Entered")

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            props.activityData.map(activity => {
                bounds.extend({
                    lat: activity.data.lat,
                    lng: activity.data.lng,
                });
            });
            map.fitBounds(bounds, 30);
        }
    }, [map, showHomeInfo, showGeofenceInfo, props.eventsMode, props.activityData, props.currentActivityID, props.currentTicketIndex, props.currentSectionIndex]);


    const onLoad = useCallback((map) => {
        setMap(map)
    }, []);

    const containerStyle = {
        // width: '100%',
        flexGrow: '1'
    };      
    const center = {
        lat: 51.8642,
        lng: -2.2382
    };
      
    const options = {
        strokeColor: '#0079bf',
        strokeOpacity: 0.25,
        strokeWeight: 5,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
    };

    const getSectionInfoWindow = (section: TripSection) => {
        if (section === undefined) return null
        switch (section.type) {
            case "Travel":
                return <>
                    <Polyline
                        path={props.activityData.filter((activity) => 
                            section.start && section.end &&
                                activity.data.date > section.start &&
                                activity.data.date < section.end
                        ).map((activity) => { 
                            return {
                                lat: activity.data.lat,
                                lng: activity.data.lng
                            }
                        })}
                        options={{
                        ...options,
                        strokeOpacity: 1
                        
                    }}
                    />
                    <InfoWindow
                        position={props.activityData.filter((activity) => 
                            section.start && section.end &&
                                activity.data.date > section.start &&
                                activity.data.date < section.end
                        ).reduce((prev, current) => {
                            return current.data.lat > prev.lat ? {
                                lat: current.data.lat,
                                lng: current.data.lng
                            } : prev
                        }, {lat: -10000, lng: -10000 })}
                        onCloseClick={props.resetSelection}
                    >   
                        <TravelInfoWindow
                            start={section.start}
                            end={section.end}
                            startLoc={section.startLoc}
                            endLoc={section.endLoc}
                            startSiteLabel={getSiteLabel(section.startSiteID, props.sites, props.homeSiteID, props.workSiteID)}
                            endSiteLabel={getSiteLabel(section.endSiteID, props.sites, props.homeSiteID, props.workSiteID)}
                        />
                    </InfoWindow> 
                </> 
            case "On-site":
            case "Home":
                return section.lat && section.lng ?
                    <InfoWindow 
                        position={{
                            lat: section.lat,
                            lng: section.lng,
                        }}
                        onCloseClick={props.resetSelection}
                    >
                        <OnSiteInfoWindow
                            isHome={section.type === "Home"}
                            start={section.start}
                            end={section.end}
                            loc={section.loc}
                            siteLabel={getSiteLabel(section.siteID, props.sites, props.homeSiteID, props.workSiteID)}

                        />
                    </InfoWindow> :
                    null
            case "Geofence": 
                return section.lat && section.lng ?
                <InfoWindow 
                    position={{
                        lat: section.lat,
                        lng: section.lng,
                    }}
                    onCloseClick={props.resetSelection}
                >
                   <GeofenceInfoWindow
                        date={section.start}
                        loc={section.loc}
                        site={section.siteName}
                   />
                </InfoWindow> :
                null
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >                
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
                onLoad={onLoad}
            >
                {/* Payable */}
                <Polyline
                    path={props.activityData.filter((_, index) => eventsPayable[index]).map((activity) => {
                        return {
                            lat: activity.data.lat,
                            lng: activity.data.lng
                        }
                    })}
                    options={{
                        ...options,
                        strokeOpacity: 0.5
                    }}
                />
                {/* Journey */}
                <Polyline
                    path={props.activityData.map((activity) => {
                        return {
                            lat: activity.data.lat,
                            lng: activity.data.lng
                        }
                    })}
                    options={options}
                />
                {/* Home */}
                {homeEvent ? 
                    <Marker
                        position={{
                            lat: homeEvent.data.lat,
                            lng: homeEvent.data.lng
                        }}
                        label={{
                            text: "\ue88a",
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "18px",
                        }}
                        onClick={() => {
                            resetMarkers();
                            props.resetSelection();
                            setShowHomeInfo(true);
                        }}
                    >
                        {showHomeInfo ? <InfoWindow
                                position={{
                                    lat: homeEvent.data.lat,
                                    lng: homeEvent.data.lng
                                }}
                                onCloseClick={resetMarkers}
                            >
                                <InfoWindowContainer
                                    headerContent={
                                        <>
                                            <Label text='Home' color="light-blue"/>
                                            {homeEvent ? 
                                                <Label text={props.trackerSites.find((site) => site.id === homeEvent.data.site_id)?.data.name} color='grey'/>
                                            : null}
                                        </>
                                    }
                                    bodyContent={
                                        <>
                                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                                                {props.activityData.filter((activity) => ["Ignition On", "Ignition Off"].includes(activity.data.event) && activity.data.site_id === props.homeSiteID).map((activity, index) => 

                                                    <DataIconPair
                                                        data={<p>{formatTime(activity.data.date)}</p>}
                                                        icon={<Label text={activity.data.event} color={activity.data.event === "Ignition On" ? 'light-green' : 'red'}/>}
                                                        key={index}
                                                    />
                                                )}
                                            </div>
                                            <div style={{borderTop: '1px solid var(--high-contrast)'}}></div>
                                            <DataIconPair
                                                data={<p>{homeEvent.data.loc}</p>}
                                                icon={<LocImg/>}
                                            />
                                        </>
                                    }
                                />
                            </InfoWindow> :
                            null
                        }
                    </Marker> :
                    null
                }
                {/* Geofence */}
                {geofenceEvent ? 
                    <Marker
                        position={{
                            lat: geofenceEvent.data.lat,
                            lng: geofenceEvent.data.lng
                        }}
                        label={{
                            text: "\ue55c",
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "18px",
                        }}
                        onClick={() => {
                            resetMarkers();
                            props.resetSelection();
                            setShowGeofenceInfo(true);
                        }}
                    >
                        {showGeofenceInfo ? <InfoWindow
                                position={{
                                    lat: geofenceEvent.data.lat,
                                    lng: geofenceEvent.data.lng
                                }}
                                onCloseClick={resetMarkers}
                            >
                                <InfoWindowContainer
                                    headerContent={
                                        <>
                                            <Label text='Geofence' color="orange"/>                                                    
                                            {geofenceEvent ? <Label text={props.trackerSites.find((site) => site.id === geofenceEvent?.data.site_id)?.data.name} color='grey'/>
                                            : null}
                                        </>
                                    }
                                    bodyContent={
                                        <>
                                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                                                {props.activityData.filter((activity) => activity.data.event === "Geofence Entered").map((activity, index) => 
                                                    <DataIconPair
                                                        data={<p>{formatTime(activity.data.date)}</p>}
                                                        icon={<Label text='Triggered' color="orange"/>}
                                                        key={index}
                                                    />
                                                )}
                                            </div>
                                            <div style={{borderTop: '1px solid var(--high-contrast)'}}></div>
                                            <DataIconPair
                                                data={<p>{geofenceEvent.data.loc}</p>}
                                                icon={<LocImg/>}
                                            />
                                        </>
                                    }
                                />                                    
                            </InfoWindow> :
                            null
                        }
                    </Marker> : 
                    null
                }
                {!props.eventsMode && getSectionInfoWindow(props.tripSections[props.currentSectionIndex])}
                {props.eventsMode ? 
                    props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event)).map((activity, index) =>
                        props.currentActivityID === activity.id && 
                            <InfoWindow
                                position={{
                                    lat: activity.data.lat,
                                    lng: activity.data.lng
                                }}
                                onCloseClick={props.resetSelection}
                                key={index}
                            >
                                <MapEventInfoWindow
                                    activity={activity}
                                    siteLabel={getSiteLabel(activity.data.site_id, props.sites, props.homeSiteID, props.workSiteID)}
                                />
                            </InfoWindow>
                    ) :
                    null
                }
                <MapTickets
                    tickets={props.tickets}
                    siteData={props.siteData}
                    customerData={props.customerData}
                    currentTicketIndex={props.currentTicketIndex}
                    setCurrentTicketIndex={props.setCurrentTicketIndex}
                    resetMarkers={resetMarkers}
                    resetSelection={props.resetSelection}
                />
            </GoogleMap>

        </LoadScript>
    )
}

export default Map