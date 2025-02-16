import Label from "../../../../../../../../components/ui/General/Label/Label"

const BasicActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Edited" iconFont="edit" color="orange"/>
            case 2:
                return <Label text="Deactivated" iconFont="highlight_off" color="red"/>
            case 3:
                return <Label text="Reactivated" iconFont="check_circle" color="light-green"/>
            default:
                return <Label text="Created" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default BasicActivityLabel