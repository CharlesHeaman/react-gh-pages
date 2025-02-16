import { DistanceMatrixService, LoadScript } from "@react-google-maps/api"
import { useState } from "react"
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { SiteResponseData } from "../../../../../../types/sites.types"
import formatHours from "../../../../../../utils/formatHours"
import formatMiles from "../../../../../../utils/formatMiles"

const CalculatedRoundTrip = (props: {
    siteData: Array<SiteResponseData>,
    customerData: Array<CustomerResponseData>
}) => {
    const [calculatedTravel, setCalculatedTravel] = useState<Array<CalculatedSiteTravel>>([]);

    const distanceMatrixResponse = (distanceData: any, siteID: number) => {
        setCalculatedTravel([...calculatedTravel, {
            site_id: siteID,
            distance: distanceData.distance.value * 2 / 1609.34,
            duration: distanceData.duration.value * 2 / 60 / 60
        }])
    }

    interface CalculatedSiteTravel {
        site_id: number,
        distance: number,
        duration: number
    }
    console.log(calculatedTravel)
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <section>
                <h2>Calculated Round Trip to Site</h2>
                <InfoGrid>
                    <GridItem>
                        The estimated time to travel from the workshop to site and back again. 
                    </GridItem>
                    <GridItem>
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Site</th>
                                    <th>Travel Time</th>
                                    <th>Distance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.siteData.map((site, index) => 
                                    <tr key={index}>
                                        {site.data.coordinates !== null && calculatedTravel.filter((calculatedTravel) => calculatedTravel.site_id === site.id).length === 0 && <DistanceMatrixService
                                            options={{
                                                destinations: [site.data.coordinates],
                                                origins: [{ lng: parseFloat(process.env.REACT_APP_WORK_LNG as string), lat: parseFloat(process.env.REACT_APP_WORK_LAT as string) }],
                                                travelMode: "DRIVING"
                                            }}
                                            callback={(res) => {
                                                res && distanceMatrixResponse(res.rows[0].elements[0], site.id);
                                            }}
                                        />}
                                        <td className="text-left">{props.customerData.find((customer) => customer.id === site.data.customer_id)?.data.name}</td>
                                        <td className="text-left">{site.data.name}</td>
                                        <td>{formatHours(calculatedTravel.find((calculatedTravel) => calculatedTravel.site_id === site.id)?.duration)} hrs</td>
                                        <td>{formatMiles(calculatedTravel.find((calculatedTravel) => calculatedTravel.site_id === site.id)?.distance)} mi</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </GridItem>
                </InfoGrid>
            </section>
        </LoadScript>
    )
}

export default CalculatedRoundTrip