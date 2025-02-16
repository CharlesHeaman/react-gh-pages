import Label from "../../../components/ui/General/Label/Label";
import getFGasTypeColor from "./getEnergySourceColor";
import getFGasTypeIcon from "./getFGasTypeIcon";
import getFGasTypeText from "./getFGasTypeText";

const FGasTypeLabel = (props: {
    fGasType: number
}) => {
    return <Label iconFont={getFGasTypeIcon(props.fGasType)} text={getFGasTypeText(props.fGasType)} color={getFGasTypeColor(props.fGasType)}/>
}

export default FGasTypeLabel