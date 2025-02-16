import { ChangeEvent } from "react"
import ActionMenu from "../../../../components/form/ActionMenu/ActionMenu"
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import Label from "../../../../components/ui/General/Label/Label"
import formatMoney from "../../../../utils/formatMoney"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"
import MoneyInput from "../../../../components/form/MoneyInput/MoneyInput"
import PercentageInput from "../../../../components/form/PercentageInput/PercentageInput"
import getEditMaterialLineTotal from "../utils/getEditMaterialLineTotal"

const EditQuoteMaterialsLineRow = (props: {
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
            <td>{props.quoteLine.category === 1 ? <Label iconFont="inventory_2" color="dark-blue" text="Materials" hideText/> :
                props.quoteLine.category === 2 ? <Label iconFont="propane" color="purple" text="Refrigerant" hideText/> :
                <Label iconFont="add" color="light-green" text="Extras/Expenses" hideText/>
            }</td>
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
            {/* Supplier */}
            <td>
                <TextareaInput 
                    name="supplier" 
                    value={props.quoteLine.supplier} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            {/* Description */}
            <td>
                <TextareaInput 
                    name="description" 
                    value={props.quoteLine.description} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            {/* Price */}
            <td>
                <MoneyInput 
                    name="price" 
                    value={props.quoteLine.price} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            {/* Markup */}
            <td>
                <PercentageInput 
                    name="markup" 
                    value={props.quoteLine.markup} 
                    updateFunc={updateLine}            
                    hasSubmitted={false}
                    required
                />
            </td>
            <td className="text-right">{formatMoney(getEditMaterialLineTotal(props.quoteLine))}</td>
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

export default EditQuoteMaterialsLineRow