import Label from "../../../../../../../../components/ui/General/Label/Label"
import formatGrossProfit from "../../../../../../../../utils/formatGrossProfit"

const GrossProfitMarginLabel = (props: {
    grossProfitMargin: number | undefined
}) => {
    const getColor = (): string => {
        if (props.grossProfitMargin === undefined || isNaN(props.grossProfitMargin)) return 'grey';
        if (props.grossProfitMargin === 0) return 'dark-blue';
        if (props.grossProfitMargin > 0) {
            return 'light-green';
        } else {
            return 'red'
        }
    }

    const getIcon = (): string => {
        if (props.grossProfitMargin === undefined || isNaN(props.grossProfitMargin)) return 'not_interested';
        if (props.grossProfitMargin === 0) return 'balance';
        if (props.grossProfitMargin > 0) {
            return 'arrow_upward';
        } else {
            return 'arrow_downward'
        }
    }

    return (
        <Label 
            iconFont={getIcon()}
            text={props.grossProfitMargin !== undefined && !isNaN(props.grossProfitMargin) ? formatGrossProfit(props.grossProfitMargin) : 'N/A'}
            color={getColor()}
            bold
        />
    )
}

export default GrossProfitMarginLabel