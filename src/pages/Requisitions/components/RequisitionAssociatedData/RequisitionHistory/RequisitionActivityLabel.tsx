import Label from "../../../../../components/ui/General/Label/Label"

const RequisitionActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Line Added" iconFont="add" color="light-green"/>
            case 2:
                return <Label text="Line Updated" iconFont="edit_note" color="orange"/>
            case 3:
                return <Label text="Line Removed" iconFont="delete" color="red"/>
            case 4:
                return <Label text="Completed" iconFont="assignment_turned_in" color="dark-blue"/>
            case 5:
                return <Label text="Price Updated" iconFont="sell" color="purple"/>
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default RequisitionActivityLabel