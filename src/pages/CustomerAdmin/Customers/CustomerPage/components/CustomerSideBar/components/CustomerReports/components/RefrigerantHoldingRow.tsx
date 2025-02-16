import RefrigerantLink from "../../../../../../../../../components/ui/Links/RefrigerantLink"
import { RefrigerantResponseData } from "../../../../../../../../../types/refrigerant.types"

const RefrigerantHoldingRow = (props: {
    refrigerant: RefrigerantResponseData,
    weight: number,
}) => {
    return (
        <tr>
            <td className="text-left"><RefrigerantLink refrigerantID={props.refrigerant.id} name={props.refrigerant.data.name}/></td>
            <td className="text-right">{props.weight}kg</td>
        </tr>
    )
}

export default RefrigerantHoldingRow