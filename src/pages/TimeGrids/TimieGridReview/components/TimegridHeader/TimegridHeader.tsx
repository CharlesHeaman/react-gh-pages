import TimegridStatus from "../../../../../components/timegrid/TimegridStatus/TimegridStatus"
import Label from "../../../../../components/ui/General/Label/Label"
import { TimegridResponseData } from "../../../../../types/timegrid.types"

const TimegridHeader = (props: {
    timegridData: TimegridResponseData | undefined,
    signaturesReceivedCount: number,
    requiredSignatureCount: number,
    engineerCount: number,
    submittedCount: number,
}) => {
    return (
        <div className="flex">
            <TimegridStatus
                status={props.timegridData?.data.status} 
                noTickets={false}
            />
            {props.timegridData?.data.is_authorisation_required ? 
                props.signaturesReceivedCount >= props.requiredSignatureCount ?
                    <Label 
                        text="Authorised"
                        color="purple"
                        iconFont="badge"
                    /> :
                    <Label 
                        text="Authorisation Required"
                        color="red"
                        iconFont="badge"
                    /> 
                : null
            }
            {props.engineerCount > 0 ?
                props.submittedCount >= props.engineerCount ?
                    <Label
                        text="Timegrids Submitted"
                        iconFont="done"
                        color="light-green"
                    /> :
                    <Label
                        text="Timegrids Outstanding"
                        iconFont="pending"
                        color="red"
                    />
                : null 
            }
        </div>
    )
}

export default TimegridHeader