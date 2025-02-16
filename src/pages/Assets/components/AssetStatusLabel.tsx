import Label from "../../../components/ui/General/Label/Label"

const AssetStatusLabel = (props: {
    isAssigned: boolean,
    hideIcon?: boolean
}) => {
    const getLabel = () => {
        if (props.isAssigned) {
            return <Label text="Assigned" iconFont="assignment_ind" color="light-green" hideIcon={props.hideIcon}/>
        } else {
            return <Label text="Unassigned" iconFont="person_off" color="dark-blue" hideIcon={props.hideIcon}/>
        }
    }
    return getLabel()
}

export default AssetStatusLabel