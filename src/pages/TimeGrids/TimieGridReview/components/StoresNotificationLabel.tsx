import Label from "../../../../components/ui/General/Label/Label"
import getVanStockRequestStatusColor from "../../../StoresNotifications/utils/getVanStockRequestStatusColor";
import getVanStockRequestStatusIcon from "../../../StoresNotifications/utils/getVanStockRequestStatusIcon";
import getVanStockRequestStatusTitle from "../../../StoresNotifications/utils/getVanStockRequestStatusTitle";

const StoresNotificationLabel = (props: {
    status: number,
    hideText?: boolean
}) => {
    return <Label 
        text={getVanStockRequestStatusTitle(props.status)}
        iconFont={getVanStockRequestStatusIcon(props.status)}
        color={getVanStockRequestStatusColor(props.status)}
        hideText={props.hideText}
    />;
}

export default StoresNotificationLabel