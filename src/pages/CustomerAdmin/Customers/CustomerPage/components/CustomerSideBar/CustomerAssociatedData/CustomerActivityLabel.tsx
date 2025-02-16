import Label from "../../../../../../../components/ui/General/Label/Label"

const CustomerActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Edit" iconFont="edit" color="orange"/>
            case 2:
                return <Label text="Deactivate" iconFont="highlight_off" color="red"/>
            case 3:
                return <Label text="Reactivate" iconFont="check_circle" color="light-green"/>
            case 4:
                return <Label text="Accounts Status Updated" iconFont="payments" color="no-color"/>
            case 5:
                return <Label text="Document Uploaded" iconFont="upload" color="no-color"/>
            case 6:
                return <Label text="Document Renamed" iconFont="edit" color="no-color"/>
            case 7:
                return <Label text="Document Deactivated" iconFont="highlight_off" color="no-color"/>
            case 8:
                return <Label text="Sage Name Updated" iconFont="add_card" color="no-color"/>
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default CustomerActivityLabel