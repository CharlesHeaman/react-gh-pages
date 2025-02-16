import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import MapVanInfoWindow from "./components/MapVanInfoWindow";

function Map(props) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            props.snapShotData.map((snapShot) => {
                bounds.extend({
                    lat: snapShot.lat,
                    lng: snapShot.lng,
                });
            });
            map.fitBounds(bounds, 30);
        }
    }, [map, props.snapShotData]);


    const onLoad = useCallback((map) => {
        setMap(map)
    }, []);

    const containerStyle = {
        width: '100%',
        flexGrow: '1'
    };
      
    const center = {
        lat: 51.8642,
        lng: -2.2382
    };

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
                {props.snapShotData.map((snapShot, index) => 
                    <Marker
                        icon={{
                            path: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.507 19l-1.507-6-6-1.5 12-4.5-4.493 12z",
                            fillColor: snapShot.ignitionOn ? "rgb(97, 189, 79)" : "rgb(235, 90, 70)",
                            fillOpacity: 1,
                            strokeColor: 'black',
                            strokeWeight: 1,
                            rotation: 0,
                            scale: props.currentVehicleID === snapShot.vehicle.id ? 1.25 : 1,
                            anchor: new window.google.maps.Point(13, 13),
                        }}
                        position={{
                            lat: snapShot.lat,
                            lng: snapShot.lng
                        }}
                        label={{
                            text: snapShot.vehicle.tracker && snapShot.vehicle.tracker.name,
                            color: '#868a92',
                            fontSize: '10px',
                            className: "map-label"
                        }}
                        zIndex={props.currentVehicleID === snapShot.vehicle.id ? 1000 : 1}
                        onClick={() => props.setCurrentVehicleID(snapShot.vehicle.id)}
                        key={index}
                    >
                        {props.currentVehicleID === snapShot.vehicle.id && <InfoWindow
                            position={{
                                lat: snapShot.lat,
                                lng: snapShot.lng
                            }}
                            onCloseClick={() => props.setCurrentVehicleID(0)}
                        >
                            <MapVanInfoWindow
                                snapShot={snapShot}
                                site={props.siteData.find((site) => site.id === snapShot.site.id) ? props.siteData.find((site) => site.id === snapShot.site.id).name : null}
                            />
                        </InfoWindow>}
                    </Marker>
                )}
            </GoogleMap>
        </LoadScript>
    )
}

export default Map