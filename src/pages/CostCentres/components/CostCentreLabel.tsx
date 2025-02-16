import Label from "../../../components/ui/General/Label/Label"
import { CostCentreResponseData } from "../../../types/costCentres.types"

const CostCentreLabel = (props: {
    costCentre: CostCentreResponseData,
    hideIcon?: boolean,
}) => {
    return (
        <Label 
            iconFont='point_of_sale'
            text={props.costCentre.data.name} 
            color="no-color"
            hideIcon={props.hideIcon}
        />
    )
}

export default CostCentreLabel