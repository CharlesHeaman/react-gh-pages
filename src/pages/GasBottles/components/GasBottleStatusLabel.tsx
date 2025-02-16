import AssignedLabel from "../../../components/ui/AssignedLabel/AssignedLabel"
import Label from "../../../components/ui/General/Label/Label"

const GasBottleStatusLabel = (props: {
    isReturned: boolean,
    isAssigned: boolean,
    isQueued: boolean,
    hideIcon?: boolean
}) => {
    const getLabel = () => {
        if (props.isReturned) return <Label text="Returned" iconFont="assignment_return" color="purple" hideIcon={props.hideIcon}/>
        if (props.isQueued) return <Label text="Queued" iconFont="assignment_return" color="dark-purple" hideIcon={props.hideIcon}/>
        if (props.isAssigned) {
            return <Label text="Assigned" iconFont="assignment_ind" color="light-green" hideIcon={props.hideIcon}/>
        } else {
            return <AssignedLabel isAssigned={undefined}/>
        }
    }
    return getLabel()
}

export default GasBottleStatusLabel