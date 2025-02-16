import formatDate from "../../../utils/formatDate"
import Label from "../General/Label/Label"
import getExpiryColor from "./getExpiryColor"

const ExpiryDateLabel = (props: {
    date: Date | null,
    startDate?: boolean,
}) => {
    return (
        props.date !== null ?
            <Label text={formatDate(props.date)} color={getExpiryColor(props.date, props.startDate)}/> 
            : 
            <Label text="N/A" color="grey"/>
    )
}

export default ExpiryDateLabel