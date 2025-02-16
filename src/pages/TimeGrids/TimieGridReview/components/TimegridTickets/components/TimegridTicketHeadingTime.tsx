import Label from "../../../../../../components/ui/General/Label/Label"
import { TimegridTicketTimeResponseData } from "../../../../../../types/timegridTicketTime.types"

const TimegridTicketHeadingTime = (props: {
    timegridTicketTime: TimegridTicketTimeResponseData | undefined
}) => {
    return (
        <div className="flex" style={{ gap: 'var(--normal-gap', marginLeft: 'auto'}}>
            {props.timegridTicketTime && <>
                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', minWidth: '6ch', textAlign: 'right' }}>
                    {props.timegridTicketTime.data.on_site_time} hrs
                </span>
                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', minWidth: '6ch', textAlign: 'right' }}>
                    {props.timegridTicketTime.data.travel_time} hrs
                </span>
                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', minWidth: '5ch', textAlign: 'right' }}>
                    {/* {props.timegridTicketTime.data.mileage} mi */}
                    {props.timegridTicketTime.data.is_own_miles ? 
                        <Label 
                            color={"purple"} 
                            text={`${props.timegridTicketTime.data.mileage} mi`} 
                            title={`${props.timegridTicketTime.data.mileage} Own Miles`}
                        /> :
                        <p>{props.timegridTicketTime.data.mileage} mi</p>
                    }
                </span>
                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', minWidth: '4ch', textAlign: 'right' }}>
                    £{props.timegridTicketTime.data.expenses}
                </span>
            </>}
        </div>
    )
}

export default TimegridTicketHeadingTime