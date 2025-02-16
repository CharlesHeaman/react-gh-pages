import Label from "../../../components/ui/General/Label/Label"

const GasBottleActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 0:
                return <Label text='Assigned' color='light-green' iconFont="assignment_ind"/>
            case 1:
                return <Label text='Charge' color='orange' iconFont="arrow_back"/>
            case 2:
                return <Label text='Decant' color='red' iconFont="arrow_forward"/>
            case 3:
                return <Label text='Unassigned' color='dark-blue' iconFont="person_off"/>
            case 4:
                return <Label text='Returned' color='purple' iconFont="assignment_return"/>
            case 6:
                return <Label text='Queued' color='dark-purple' iconFont="post_add"/>
            case 7:
                return <Label text='Removed from Queue' color='red' iconFont="playlist_remove"/>
            case 8:
                return <Label text="Deactivated" iconFont="highlight_off" color="red"/>
            default:
                return <Label text='Created' color='dark-blue' iconFont="assignment_returned"/>
        }
    }
    
    return getLabel();
}
    
export default GasBottleActivityLabel