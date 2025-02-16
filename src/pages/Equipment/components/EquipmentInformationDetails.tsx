import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import { DepartmentResponseData } from "../../../types/department.types"
import { Equipment } from "../../../types/equipment.types"
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types"
import EquipmentTypeLink from "../../EquipmentTypes/components/EquipmentTypeLink"
import EnergySourceLabel from "./EnergySourceLabel"

const EquipmentInformationDetails = (props: {
    equipmentData: Equipment,
    departmentData: DepartmentResponseData,
    equipmentTypeData: EquipmentTypeResponseData | undefined,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Equipment Details</h2>
            <InfoGrid>
                {props.isPreview ? <GridItem title='Code'>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>#{props.equipmentData.code.toLocaleUpperCase()}</span></p>
                </GridItem> : null}
                <GridItem title='Equipment Type' span={3}>
                    <p>{props.equipmentTypeData ? <EquipmentTypeLink equipmentTypeID={props.equipmentTypeData.id} name={props.equipmentTypeData.data.name}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Certification Body' span={3}>
                    <EnergySourceLabel energySource={props.equipmentTypeData ? props.equipmentTypeData.data.energy_source : null}/>
                </GridItem>
                <GridItem title='Department'>
                    <DepartmentLabel department={props.departmentData}/>
                </GridItem>
                <GridItem title='Location' span={3}>
                    <p>{props.equipmentData.location}</p>
                </GridItem>
                <GridItem title='Description' span={3}>
                    <p>{props.equipmentData.description}</p>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.equipmentData.notes ? props.equipmentData.notes : 'None'}</p>
                </GridItem>
                <GridItem title='Internal Notes'>
                    <p>{props.equipmentData.internal_notes ? props.equipmentData.internal_notes : 'None'}</p>
                </GridItem>                                
            </InfoGrid>
        </section>
    )
}

export default EquipmentInformationDetails