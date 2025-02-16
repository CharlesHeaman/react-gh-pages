import Label from "../../../components/ui/General/Label/Label"

const TimegridActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Over-claimed" iconFont="warning" color="red"/>
            case 2:
                return <Label text="Returned" iconFont="assignment_return" color="orange"/>
            case 3:
                return <Label text="Validated" iconFont="verified" color="purple"/>
            case 4:
                return <Label text="Processed" iconFont="check_circle" color="dark-blue"/>
            case 5:
                return <Label text="Signatured Added" iconFont="badge" color="dark-purple"/>
            case 6:
                return <Label text="Payable Period Updated" iconFont="timeline" color="orange"/>
            default:
                return <Label text="Submitted" iconFont="send" color="light-green"/>
        }
    }

    return getLabel();
}
    
export default TimegridActivityLabel