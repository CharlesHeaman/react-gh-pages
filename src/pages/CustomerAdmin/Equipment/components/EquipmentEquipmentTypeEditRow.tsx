import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput";
import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types";
import SlaveQuantityLabel from "../../../EquipmentTypes/components/SlaveQuantityLabel";

const EquipmentEquipmentTypeEditRow = (props: {
    createEquipmentCollectionAttributes: CreateEquipmentCollectionAttributes,
    updateEquipmentTypeQuantity: (quantity: string, equipmentTypeID: number) => void,
    updateVariableSlaveQuantity: (slaveQuantity: string, slaveIndex: number, equipmentTypeID: number) => void
}) => {

    const quantity = !isNaN(parseInt(props.createEquipmentCollectionAttributes.quantity)) ? parseInt(props.createEquipmentCollectionAttributes.quantity) : 1;
    return (
        <tr>
            <td>
                <IntegerInput 
                    name={`quantity_${props.createEquipmentCollectionAttributes.equipment_type_id}`} 
                    label="Quantity" 
                    value={props.createEquipmentCollectionAttributes.quantity}
                    updateFunc={(event) => props.updateEquipmentTypeQuantity(event.target.value, props.createEquipmentCollectionAttributes.equipment_type_id)} 
                    hasSubmitted={false}
                    maxWidth={50}
                />
            </td>
            <td className="text-left">{props.createEquipmentCollectionAttributes.equipment_type_name}</td>
            <td>{props.createEquipmentCollectionAttributes.slave_quantity >= 0 ?
                <SlaveQuantityLabel slaveQuantity={props.createEquipmentCollectionAttributes.slave_quantity}/> :
                <div className="flex" style={{ flexDirection: 'column'}}>
                    {[...Array(quantity)].map((_item, index) => 
                        <IntegerInput 
                            name={`slave_quantity_${props.createEquipmentCollectionAttributes.equipment_type_id}_${index}`} 
                            value={props.createEquipmentCollectionAttributes.variable_slave_quantity[index]} 
                            label={"Quantity"} 
                            updateFunc={(event) => props.updateVariableSlaveQuantity(event.target.value, index, props.createEquipmentCollectionAttributes.equipment_type_id)} 
                            hasSubmitted={false}
                            prefix={`#${index + 1}`}
                            maxWidth={65}
                            key={index}
                        />
                    )}
                </div>
            }</td>
        </tr>
    )
}

export default EquipmentEquipmentTypeEditRow;