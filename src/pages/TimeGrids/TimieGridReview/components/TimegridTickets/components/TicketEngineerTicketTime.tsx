import TimegridStatus from "../../../../../../components/timegrid/TimegridStatus/TimegridStatus"
import Label from "../../../../../../components/ui/General/Label/Label"
import UserLink from "../../../../../../components/ui/Links/UserLink"
import { TimegridResponseData } from "../../../../../../types/timegrid.types"
import { TimegridTicketTimeResponseData } from "../../../../../../types/timegridTicketTime.types"
import { UserResponseData } from "../../../../../../types/user.types"

const TicketEngineerTicketTime = (props: {
    user: UserResponseData | undefined,
    timegrid: TimegridResponseData | undefined,
    timegridTicketTime: TimegridTicketTimeResponseData | undefined
}) => {
    return (
        <tr>
            <td className="text-left">{props.user ? 
                <UserLink   
                    username={props.user.data.username}
                    firstName={props.user.data.first_name}
                    lastName={props.user.data.last_name}
                /> : 
                null
            }</td>
            {props.timegridTicketTime ? 
                <>
                    <td className="text-right">
                        <p>{props.timegridTicketTime.data.on_site_time} hrs</p>
                    </td>
                    <td className="text-right">
                        <p>{props.timegridTicketTime.data.travel_time} hrs</p>
                    </td>
                    <td className="text-right">
                        {props.timegridTicketTime.data.is_own_miles ? 
                            <Label 
                                iconFont="local_gas_station" 
                                color={"purple"} 
                                text={`${props.timegridTicketTime.data.mileage} mi`}
                                title={`${props.timegridTicketTime.data.mileage} Own Miles`}
                            /> :
                            <p>{props.timegridTicketTime.data.mileage} mi</p>
                        }
                    </td>
                    <td className="text-right">
                        <p>£{props.timegridTicketTime.data.expenses}</p>
                    </td>
                    <td>
                        <TimegridStatus
                            status={props.timegrid?.data.status} 
                            hideText
                            noTickets={false}
                        />                    
                    </td>
                </> :
                <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </>
            }
        </tr>
    )
}

export default TicketEngineerTicketTime