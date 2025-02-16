import Label from "../../../components/ui/General/Label/Label";
import getQuotedEquipmentStatusColor from "../utils/getQuotedEquipmentStatusColor";
import getQuotedEquipmentStatusIcon from "../utils/getQuotedEquipmentStatusIcon";
import getQuotedEquipmentStatusTitle from "../utils/getQuotedEquipmentStatusTitle";

const QuotedEquipmentStatusLabel = (props: {
    status: number,
    hideText?: boolean,
    noBackground?: boolean
}) => {
    return <Label 
        text={getQuotedEquipmentStatusTitle(props.status)}
        color={getQuotedEquipmentStatusColor(props.status)}
        iconFont={getQuotedEquipmentStatusIcon(props.status)}
        hideText={props.hideText}
        noBackground={props.noBackground}
    />;
}

export default QuotedEquipmentStatusLabel 