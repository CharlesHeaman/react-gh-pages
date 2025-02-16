import Label from "../../../components/ui/General/Label/Label";
import getEnergySourceColour from "./getEnergySourceColour";
import getEnergySourceIcon from "./getEnergySourceIcon";
import getEnergySourceText from "./getEnergySourceText";

const EnergySourceLabel = (props: {
    energySource: number | null
}) => {

    return <Label 
        text={getEnergySourceText(props.energySource)} 
        color={getEnergySourceColour(props.energySource)} 
        iconFont={getEnergySourceIcon(props.energySource)}
    />
}

export default EnergySourceLabel