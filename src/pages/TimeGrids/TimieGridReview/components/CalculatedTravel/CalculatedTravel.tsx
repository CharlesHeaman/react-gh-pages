import { Dispatch, SetStateAction } from "react"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { EngineerPayablePeriodResponseData } from "../../../../../types/engineerPayablePeriod.types"
import { TrackerActivityResponseData } from "../../../../../types/trackerActivity.types"
import { UserResponseData } from "../../../../../types/user.types"
import { VehicleResponseData } from "../../../../../types/vehicles.types"
import calculateMileage from "../../utils/calculatedMileage"
import calculateTravelTime from "../../utils/calculatedTravelTime"
import calculateOnSiteTime from "../../utils/calculateOnSiteTime"
import ComparisonBox from "../ComparisonBox/ComparisonBox"
import getPayableEvents from "../JourneyMap/utils/getPayableEvents"
import { TripSection } from "../JourneyMap/utils/getTripSections"
import CalculatedTimeDescription from "./CalculatedTimeDescription"

const CalculatedTravel = (props: {
    vehicleData: VehicleResponseData,
    tripSections: Array<TripSection>,
    activityData: Array<TrackerActivityResponseData>, 
    homeSiteID: string,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
    engineerPayablePeriodUser: UserResponseData | undefined
}) => {
    let eventsArray = props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event));

    const eventsPayable = getPayableEvents(props.activityData, props.homeSiteID, props.engineerPayablePeriod);  

    return (
        <section style={{
            border: '1px solid var(--high-contrast)',
            borderRadius: 'var(--container-border-radius)',
            padding: 'var(--normal-gap)',
            backgroundColor: 'var(--off-white-bg)',
        }}>
            <h2>Calculated Time</h2>
            <InfoGrid>
                <GridItem>
                    <CalculatedTimeDescription
                        vehicleData={props.vehicleData} 
                        eventsPayable={eventsPayable} 
                        eventsArray={eventsArray} 
                        homeSiteID={props.homeSiteID}       
                        engineerPayablePeriod={props.engineerPayablePeriod}    
                        engineerPayablePeriodUser={props.engineerPayablePeriodUser}                 
                    />
                </GridItem>       
                <GridItem>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}>

                        <ComparisonBox
                            label='Hours'
                            value={calculateOnSiteTime(props.tripSections) + calculateTravelTime(props.tripSections)}
                            icon='timer'
                            suffix=' hrs'
                        />
                        <ComparisonBox
                            label='Miles'
                            value={calculateMileage(props.tripSections)}
                            icon='local_gas_station'
                            suffix=' mi'
                        />
                    </div>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CalculatedTravel