import Label from "../../../../../../components/ui/General/Label/Label"

const DepartmentActivityLabel = (props: {
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
                return <Label text="Rates Updated" iconFont="currency_pound" color="no-color"/>
            case 5:
                return <Label text="Select Modules" iconFont="checklist_rtl" color="no-color"/>
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default DepartmentActivityLabel