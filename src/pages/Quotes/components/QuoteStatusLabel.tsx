import Label from "../../../components/ui/General/Label/Label"
import getQuoteStatusColor from "../utils/getQuoteStatusColor";
import getQuoteStatusIcon from "../utils/getQuoteStatusIcon";
import getQuoteStatusTitle from "../utils/getQuoteStatusTitle";

const QuoteStatusLabel = (props: {
    status: number,
    hideText?: boolean
}) => {
    return <Label 
        text={getQuoteStatusTitle(props.status)}
        color={getQuoteStatusColor(props.status)}
        iconFont={getQuoteStatusIcon(props.status)}
        hideText={props.hideText}
    />;
}

export default QuoteStatusLabel 