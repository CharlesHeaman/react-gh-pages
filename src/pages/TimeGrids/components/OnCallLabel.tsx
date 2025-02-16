import Label from "../../../components/ui/General/Label/Label"
import { OnCallEngineerResponseData } from "../../../types/OnCallEngineer.types"
import formatTime from "../../../utils/formatTime"
import getDayRelativeDate from "../../../utils/getDayRelativeDate"

const OnCallLabel = (props: {
    onCallEngineer: OnCallEngineerResponseData,
    date: Date,
    hideIcon?: boolean
}) => {

    const startsBefore = new Date(props.onCallEngineer.data.start_date).getTime() <= new Date(new Date(props.date).setHours(0,0,0,0)).getTime()
    const endsAfter = new Date(props.onCallEngineer.data.end_date).getTime() > new Date(getDayRelativeDate(props.date, 1).setHours(0,0,0,0)).getTime()

    const getText = (): string => {
        if (startsBefore && endsAfter) return 'All Day'
        if (startsBefore) return `until ${formatTime(props.onCallEngineer.data.end_date)}`
        return `from ${formatTime(props.onCallEngineer.data.start_date)}`
    }
    return (
        <Label 
            text={`On-call ${getText()}`}
            color="dark-blue" 
            iconFont="perm_phone_msg"
            hideIcon={props.hideIcon}
        />
    )
}

export default OnCallLabel