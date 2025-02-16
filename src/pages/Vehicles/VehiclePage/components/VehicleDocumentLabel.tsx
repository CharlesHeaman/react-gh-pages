import Label from "../../../../components/ui/General/Label/Label"
import getVehicleDocumentIcon from "../../utils/getVehicleDocumentIcon"
import getVehicleDocumentText from "../../utils/getVehicleDocumentText"

const VehicleDocumentLabel = (props: {
    type: number
}) => {
    return (
        <Label
            iconFont={getVehicleDocumentIcon(props.type)}
            text={getVehicleDocumentText(props.type)}
            color="no-color"
        />
    )
}

export default VehicleDocumentLabel