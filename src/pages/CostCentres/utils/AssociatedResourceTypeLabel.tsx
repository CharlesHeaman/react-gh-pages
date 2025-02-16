import Label from "../../../components/ui/General/Label/Label"
import getAssociatedResourceTypeIcon from "./getAssociatedResourceTypeIcon"
import getAssociatedResourceTypeName from "./getAssociatedResourceTypeName"

const AssociatedResourceTypeLabel = (props: {
    resourceType: number | null
}) => {
    return <Label 
        iconFont={getAssociatedResourceTypeIcon(props.resourceType)}
        text={getAssociatedResourceTypeName(props.resourceType)} 
        color="no-color"
    />
}

export default AssociatedResourceTypeLabel