import Label from "../../../components/ui/General/Label/Label"
import getDispatchByIcon from "../utils/getDispatchByIcon"
import getDispatchByTitle from "../utils/getDispatchByTitle"

const PurchaseOrderDispatchByLabel = (props: {
    dispatchByType: number
}) => {
    return <Label 
        text={getDispatchByTitle(props.dispatchByType)} 
        color='grey' 
        iconFont={getDispatchByIcon(props.dispatchByType)}
    />
}

export default PurchaseOrderDispatchByLabel