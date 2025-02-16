import { AdditionalTimeResponseData } from "../../../../../types/additionalTime.types";
import { TimegridTicketTimeResponseData } from "../../../../../types/timegridTicketTime.types";
import reduceTimegridTicketTime from "../../../../../utils/reduceTimegridTicketTime";
import calculateMileage from "../../utils/calculatedMileage";
import calculateTravelTime from "../../utils/calculatedTravelTime";
import calculateOnSiteTime from "../../utils/calculateOnSiteTime";
import ComparisonBox from "../ComparisonBox/ComparisonBox";
import { TripSection } from "../JourneyMap/utils/getTripSections";
import getReducedAdditionalTime from "../utils/reducedAdditionalTime";

function TotalTime(props: { 
    userID: number,
    timegridTicketTime: Array<TimegridTicketTimeResponseData>,
    additionalTimeData: Array<AdditionalTimeResponseData>,
    tripSections: Array<TripSection>,
    noVehicle: boolean,
}) {

    const getUserTimegridTicketTime = () => {
        return props.timegridTicketTime.filter((timegridTicketTime) => timegridTicketTime.data.user_id === props.userID);
    }

    const getReducedUserTimegridTicketTime = () => {
        return reduceTimegridTicketTime(getUserTimegridTicketTime())
    }

    return (
        <section>
            <h2>Total Time</h2>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr',
            }}>
                <ComparisonBox
                    label='Hours'
                    value={(
                        getReducedUserTimegridTicketTime().on_site_time + 
                        getReducedAdditionalTime(props.additionalTimeData).activity_time +
                        getReducedUserTimegridTicketTime().travel_time + 
                        getReducedAdditionalTime(props.additionalTimeData).travel_time
                    )}
                    icon='timer'
                    suffix=' hrs'
                    comparison={(!props.noVehicle && props.tripSections.length > 0) ? 
                        (
                            calculateOnSiteTime(props.tripSections) + calculateTravelTime(props.tripSections)
                        ) : undefined
                    }
                />
                <ComparisonBox
                    label='Miles'
                    value={getReducedUserTimegridTicketTime().mileage + getReducedAdditionalTime(props.additionalTimeData).mileage}
                    icon='local_gas_station'
                    suffix=' mi'
                    comparison={(!props.noVehicle && props.tripSections.length > 0) ? calculateMileage(props.tripSections) : undefined}
                />
                <ComparisonBox
                    label='Expenses'
                    value={getReducedUserTimegridTicketTime().expenses + getReducedAdditionalTime(props.additionalTimeData).expenses}
                    icon='currency_pound'
                    prefix='£'
                />
            </div>
        </section>
    )
}

export default TotalTime