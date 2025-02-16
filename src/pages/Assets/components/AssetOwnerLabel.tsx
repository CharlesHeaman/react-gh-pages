import Label from "../../../components/ui/General/Label/Label"
import getOwnerTypeIcon from "./getOwnerTypeIcon"
import getOwnerTypeText from "./getOwnerTypeText"

const AssetOwnerLabel = (props: {
    ownerType: number,
}) => {
    return <Label
        iconFont={getOwnerTypeIcon(props.ownerType)}
        text={getOwnerTypeText(props.ownerType)}
        color="no-color"
    />
}

export default AssetOwnerLabel