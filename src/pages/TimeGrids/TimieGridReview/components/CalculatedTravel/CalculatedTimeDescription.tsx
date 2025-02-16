import Label from "../../../../../components/ui/General/Label/Label"
import { EngineerPayablePeriodResponseData } from "../../../../../types/engineerPayablePeriod.types"
import { TrackerActivityResponseData } from "../../../../../types/trackerActivity.types"
import { UserResponseData } from "../../../../../types/user.types"
import { VehicleResponseData } from "../../../../../types/vehicles.types"
import getUserFullName from "../../../../../utils/getUserFullName"
import getCalculatedFrom from "./utils/getCalculatedFrom"
import getCalculatedTo from "./utils/getCalculatedTo"

const CalculatedTimeDescription = (props: {
    vehicleData: VehicleResponseData,
    eventsPayable: Array<boolean>,
    eventsArray: Array<TrackerActivityResponseData>,
    homeSiteID: string,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
    engineerPayablePeriodUser: UserResponseData | undefined
}) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--small-gap)',
            alignItems: 'center'
        }}>
            Engineer payable period from
            {getCalculatedFrom(props.eventsPayable, props.eventsArray, props.homeSiteID, props.engineerPayablePeriod)}
            to
            {getCalculatedTo(props.eventsPayable, props.eventsArray, props.homeSiteID, props.engineerPayablePeriod)}
            driving vehicle
            <Label text={props.vehicleData.data.registration_number} color='no-color'/>
            {props.engineerPayablePeriod ? 
               ` defined by ${props.engineerPayablePeriodUser ? ` ${getUserFullName(props.engineerPayablePeriodUser)}` : ' Unknown'}`
               : ' calculated by  system'
            }
            .
        </div>
    )
}

export default CalculatedTimeDescription