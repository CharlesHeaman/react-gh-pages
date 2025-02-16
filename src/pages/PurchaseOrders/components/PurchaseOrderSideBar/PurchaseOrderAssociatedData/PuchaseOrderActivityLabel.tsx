import Label from "../../../../../components/ui/General/Label/Label"

const PurchaseOrderActivityLabel = (props: {
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
                return <Label text="Sent" iconFont="assignment_turned_in" color="light-green"/>
            case 5:
                return <Label text="Document Uploaded" iconFont="upload" color="no-color"/>
            case 6:
                return <Label text="Document Renamed" iconFont="edit" color="no-color"/>
            case 7:
                return <Label text="Document Deactivated" iconFont="highlight_off" color="no-color"/>
            case 8:
                return <Label text="Line Received" iconFont="fact_check" color="dark-blue"/>
            case 9:
                return <Label text="Line Reconciled" iconFont="balance" color="purple"/>
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default PurchaseOrderActivityLabel