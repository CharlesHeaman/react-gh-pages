import getTimeGridStatusColour from "../../../pages/TimeGrids/utils/getTimeGridStatusColour"
import getTimeGridStatusIcon from "../../../pages/TimeGrids/utils/getTimegridStatusIcon"
import getTimeGridStatusText from "../../../pages/TimeGrids/utils/getTimegridStatusText"
import Label from "../../ui/General/Label/Label"

const TimegridStatus = (props: { 
    status: number | undefined, 
    noTickets: boolean, 
    hideText?: boolean
}) => {
    return <Label
        text={getTimeGridStatusText(props.status)}
        color={getTimeGridStatusColour(props.status)}
        iconFont={getTimeGridStatusIcon(props.status)}
        hideText={props.hideText}
    />
}

export default TimegridStatus 