import { useState } from "react";
import EquipmentTypeSelect from "../../../../components/form/SelectEquipmentType/EquipmentTypeSelect";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound";
import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import EquipmentEquipmentTypeEditRow from "./EquipmentEquipmentTypeEditRow";
import reduceEquipmentEquipmentTypeQuantity from "../utils/reduceEquipmentEquipmentTypeQuantity";
import reduceEquipmentEquipmentTypeSlaveQuantity from "../utils/reduceEquipmentEquipmentTypeSlaveQuantity";

const SelectEquipmentEquipmentTypes = (props: {
    equipmentTypes: Array<CreateEquipmentCollectionAttributes>,
    setEquipmentTypes: (equipmentTypes: Array<CreateEquipmentCollectionAttributes>) => void,
    departmentID: number,
}) => {

    const [selectedEquipmentType, setSelectedEquipmentType] = useState<EquipmentTypeResponseData>();

    const addEquipmentType = () => {
        if (selectedEquipmentType) {
            if (!props.equipmentTypes.some(equipmentType => equipmentType.equipment_type_id === selectedEquipmentType.id)) {
                props.setEquipmentTypes([...props.equipmentTypes, {
                    quantity: '1',
                    equipment_type_id: selectedEquipmentType.id,
                    equipment_type_name: selectedEquipmentType.data.name,
                    slave_quantity: selectedEquipmentType.data.slave_quantity,
                    variable_slave_quantity: selectedEquipmentType.data.slave_quantity >= 0 ? [] :  ['1']
                }]);
            }
            setSelectedEquipmentType(undefined);
        }
    }

    const updateEquipmentTypeQuantity = (quantity: string, equipmentTypeID: number) => {
        props.setEquipmentTypes(props.equipmentTypes.map(equipmentTypeMap => {
            if (equipmentTypeMap.equipment_type_id === equipmentTypeID) {
                return {
                    ...equipmentTypeMap,
                    quantity: quantity,
                    variable_slave_quantity: equipmentTypeMap.slave_quantity >= 0 ? [] : [...Array(!isNaN(parseInt(quantity)) ? parseInt(quantity) : 1)].map(() => '1')
                }
            }
            return equipmentTypeMap;
        }))
    }

    const updateVariableSlaveQuantity = (slaveQuantity: string, slaveIndex: number, equipmentTypeID: number) => {
        props.setEquipmentTypes(props.equipmentTypes.map(equipmentTypeMap => {
            if (equipmentTypeMap.equipment_type_id === equipmentTypeID) {
                return {
                    ...equipmentTypeMap,
                    variable_slave_quantity: equipmentTypeMap.variable_slave_quantity.map((slaveQuantityMap, index) => {
                        if (index === slaveIndex) {
                            return slaveQuantity;
                        }
                        return slaveQuantityMap;
                    })
                }
            }
            return equipmentTypeMap;
        }));
    }
    
    return (
        <>
            <section>
                <h2>Select Equipment Type</h2>
                <InfoGrid>
                    <GridItem title="Equipment type">
                        <EquipmentTypeSelect
                            selectedEquipmentType={selectedEquipmentType}
                            setSelectedEquipmentType={setSelectedEquipmentType}
                            departmentID={props.departmentID}
                            hasSubmitted={false}
                        />
                        <ContainerFooter>
                            <SubmitButton
                                text="Add Equipment Type"
                                clickFunc={addEquipmentType}
                                iconFont="playlist_add"
                            />
                        </ContainerFooter>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Equipment List</h2>
                {props.equipmentTypes.length > 0 ? 
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>Equipment Types</th>
                                    <th>Slave Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.equipmentTypes.map((equipmentType, index) => 
                                    <EquipmentEquipmentTypeEditRow
                                        createEquipmentCollectionAttributes={equipmentType}
                                        updateEquipmentTypeQuantity={updateEquipmentTypeQuantity}
                                        updateVariableSlaveQuantity={updateVariableSlaveQuantity}
                                        key={index}
                                    />
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>{reduceEquipmentEquipmentTypeQuantity(props.equipmentTypes)} Equipment</th>
                                    <td></td>
                                    <th>{reduceEquipmentEquipmentTypeSlaveQuantity(props.equipmentTypes)} Slaves</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    :
                    <InnerContainer>
                        <NoneFound 
                            iconFont={"local_laundry_service"} 
                            text={"No equipment selected."}
                        />
                    </InnerContainer>
                }
            </section>
        </>
    )
}

export default SelectEquipmentEquipmentTypes