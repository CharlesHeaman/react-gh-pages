import { useEffect, useState } from "react"
import MapsMap from "../../../../../components/maps/MapsMap"
import MapsMarker from "../../../../../components/maps/MapsMarker"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Customer } from "../../../../../types/customers.types"
import { SiteCollectionResponse } from "../../../../../types/sites.types"
import getAPI from "../../../../../utils/getAPI"

const CustomerLocationInformation = (props: {
    customerData: Customer,
    customerID: number,
    isPreview?: boolean
}) => {
    const [map, setMap] = useState<google.maps.Map>();

    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            sitesData && sitesData.data.map(site => {
                site.data.coordinates && bounds.extend({
                    lat: site.data.coordinates.lat,
                    lng: site.data.coordinates.lng,
                });
            });
            map.fitBounds(bounds);
        }
    }, [map, sitesData]);

    useEffect(() => {
        getSites(props.customerID);
    }, [props.customerID]);

    const getSites = (customerID: number) => {
        getAPI(`sites`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
        }, setIsSiteLoading);
    }
    
    return (
        <section>
            <h2>Location Information</h2>
            <InfoGrid>
                <GridItem title='Address' span={4}>
                    <p>{props.customerData.address}</p>
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <p>{props.customerData.postcode}</p>
                </GridItem>
                {!props.isPreview && sitesData && sitesData.data.length > 0 ? <GridItem>
                    <MapsMap
                        onLoad={(map: google.maps.Map) => setMap(map)}
                        maxHeight={300}
                    >
                        {/* Site Marker */}
                        {sitesData && sitesData.data.map((site, index) =>
                            site.data.coordinates ? <MapsMarker 
                                title={site.data.code} 
                                coordinates={site.data.coordinates} 
                                iconCode={"\ue0af"}
                                key={index}
                            /> : null
                        )}
                    </MapsMap>
                </GridItem> : null}
            </InfoGrid>
        </section>
    )
}

export default CustomerLocationInformation