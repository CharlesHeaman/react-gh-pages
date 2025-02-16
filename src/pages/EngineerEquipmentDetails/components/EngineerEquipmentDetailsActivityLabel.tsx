import Label from "../../../components/ui/General/Label/Label"

const EngineerEquipmentDetailsActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Processed" iconFont="check_circle" color="dark-blue"/>
            default:
                return <Label text="Created" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default EngineerEquipmentDetailsActivityLabel