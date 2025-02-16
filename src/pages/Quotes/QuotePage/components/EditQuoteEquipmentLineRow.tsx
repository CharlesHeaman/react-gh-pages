import { ChangeEvent } from "react"
import ActionMenu from "../../../../components/form/ActionMenu/ActionMenu"
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput"
import MinutesInput from "../../../../components/form/MinutesInput/MinutesInput"
import TextInput from "../../../../components/form/TextInput/TextInput"
import formatHours from "../../../../utils/formatHours"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"
import getEditEquipmentLineTotal from "../utils/getEditEquipmentLineTotal"

const EditQuoteEquipmentLineRow = (props: {
    quoteLine: EditQuoteLineData,
    updateFunc: (lineID: number, name: string, value: string) => void,
    removeFunc: (lineID: number) => void,
}) => {
    const updateLine = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        props.updateFunc(
            props.quoteLine.line_id,
            event.target.name,
            event.target.value
        )
    }

    return (
        <tr>
            {/* Quantity */}
            <td>
                <IntegerInput
                    name="quantity"
                    value={props.quoteLine.quantity.toString()}
                    updateFunc={updateLine}
                    label="Quantity"
                    required
                    hasSubmitted={false}
                    maxWidth={55}
                />
            </td>
            {/* Description */}
            <td>
                <TextInput 
                    name="description" 
                    value={props.quoteLine.description} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            {/* Price */}
            <td>
                <MinutesInput 
                    name="price" 
                    label="Time"
                    value={props.quoteLine.price} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            <td className="text-right">{formatHours(getEditEquipmentLineTotal(props.quoteLine))} hrs</td>
            <td>
                <ActionMenu 
                    actionItems={[{
                        iconFont: 'delete',
                        text: 'Remove',
                        clickFunc: () => props.removeFunc(props.quoteLine.line_id)
                    }]}
                />
            </td> 
        </tr>
    )
}

export default EditQuoteEquipmentLineRow