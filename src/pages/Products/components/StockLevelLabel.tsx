import Label from "../../../components/ui/General/Label/Label"
import getOrderThresholdColor from "../utils/getOrderThresholdColor"
import getOrderThresholdStatus from "../utils/getOrderThresholdStatus"
import getOrderThresholdTitle from "../utils/getOrderThresholdTitle"

const StockLevelLabel = (props: {
    stockLevel: number,
    orderThreshold: number | null,
    showTitle?: boolean,
}) => {
    return (
        <Label 
            text={props.showTitle ? getOrderThresholdTitle(getOrderThresholdStatus(props.stockLevel, props.orderThreshold)) : props.stockLevel.toString()} 
            iconFont="data_thresholding"
            color={getOrderThresholdColor(props.stockLevel, props.orderThreshold)}
        />
    )
}

export default StockLevelLabel