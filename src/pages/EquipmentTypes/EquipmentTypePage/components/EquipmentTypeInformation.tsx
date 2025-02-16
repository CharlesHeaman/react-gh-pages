import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import { DepartmentCollectionResponse } from "../../../../types/department.types"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types"
import formatMinutes from "../../../../utils/formatMinutes"
import EnergySourceLabel from "../../../Equipment/components/EnergySourceLabel"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"

const EquipmentTypeInformation = (props: {
    equipmentType: EquipmentTypeResponseData,
    departments: DepartmentCollectionResponse,
    lastDeactivate: Date | undefined,
}) => {
    return (
        <>
            {!props.equipmentType.data.is_active ? <InactiveStatus resourceName='Equipment Type' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Equipment Type Details</h2>
                <InfoGrid columnCount={9}>
                    <GridItem title='Name'>
                        <p>{props.equipmentType.data.name}</p>
                    </GridItem>
                    <GridItem title='Department' span={3}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--small-gap)' }}>
                            {props.departments.data.map((department, index) => 
                                <DepartmentLabel
                                    department={department}
                                    key={index}
                                />     
                            )}
                        </div>
                    </GridItem>
                    <GridItem title='Certification Body' span={3}>
                        <EnergySourceLabel energySource={props.equipmentType.data.energy_source}/>
                    </GridItem>
                    <GridItem title='Service Time' span={3}>
                        <p>{formatMinutes(props.equipmentType.data.service_duration)} min</p>
                    </GridItem>
                </InfoGrid>
                <hr/>
                <InfoGrid columnCount={9}>
                    <GridItem title='Master' span={3}>
                        <BooleanLabel true={props.equipmentType.data.is_master}/>
                    </GridItem>
                    <GridItem title='Slave Quantity' span={3}>
                        {props.equipmentType.data.slave_quantity === 0 ? 
                            <Label color="grey" text="None" iconFont="not_interested"/> :
                                props.equipmentType.data.slave_quantity < 0 ?
                                <Label color="purple" text="Variable" iconFont="question_mark"/> :
                                    props.equipmentType.data.slave_quantity
                        }
                    </GridItem>
                </InfoGrid>
                <hr/>
                <InfoGrid columnCount={9}>
                    <GridItem title='Slave' span={3}>
                        <BooleanLabel true={props.equipmentType.data.is_slave}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default EquipmentTypeInformation