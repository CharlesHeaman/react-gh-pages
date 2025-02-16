import Label from "../../../components/ui/General/Label/Label"
import getSupplierManufacturerDocumentIcon from "../utils/getSupplierManufacturerDocumentIcon"
import getSupplierManufacturerDocumentText from "../utils/getSupplierManufacturerDocumentText"

const SupplierManufacturerDocumentLabel = (props: {
    type: number
}) => {
    return (
        <Label
            iconFont={getSupplierManufacturerDocumentIcon(props.type)}
            text={getSupplierManufacturerDocumentText(props.type)}
            color="no-color"
        />
    )
}

export default SupplierManufacturerDocumentLabel