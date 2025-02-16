import Label from "../../../components/ui/General/Label/Label";

const QuoteResponseLabel = (props: {
    status: number
}) => {
    const getLabel = () => {
        switch (props.status) {
            case 1:
            case 5:
                return <Label text="Accepted" color="light-green" iconFont="thumb_up"/>
            case 3:
                return <Label text="Declined" color="red" iconFont="thumb_down"/>
            default:
                return <Label text="None" color="grey" iconFont="not_interested"/>
        }
    }
    return getLabel();
}

export default QuoteResponseLabel 