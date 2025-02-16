import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import Label from "../../../components/ui/General/Label/Label"
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink"
import { Asset } from "../../../types/asset.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import AssetOwnerLabel from "./AssetOwnerLabel"

const PlantEquipmentInformationDetails = (props: {
    plantEquipmentData: Asset,
    manufacturer: SupplierManufacturerResponseData | undefined,
    department: DepartmentResponseData | undefined,
    plantEquipmentType: PlantEquipmentTypeResponseData,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Plant/Tools Details</h2>
            <InfoGrid>
                <GridItem title='Description'>
                    <p>{props.plantEquipmentData.description}</p>
                </GridItem>
                <GridItem title='Type' span={3}>
                    <Label text={props.plantEquipmentType.data.name} iconFont="handyman" color="no-color"/>
                </GridItem>
                <GridItem title='Manufacturer' span={3}>
                    <p>{props.manufacturer ? 
                        <SupplierManufacturerLink code={props.manufacturer.data.code} name={props.manufacturer.data.name}/> : 
                        props.plantEquipmentData.manufacturer.length > 0 ? 
                            props.plantEquipmentData.manufacturer :
                            'Unknown'
                    }</p>
                </GridItem>                    
                <GridItem title='Model Number' span={3}>
                    <p>{props.plantEquipmentData.model_no}</p>
                </GridItem>
                <GridItem title='Serial Number' span={3}>
                    <p>{props.plantEquipmentData.serial_no}</p>
                </GridItem>
                <GridItem title='Owner' span={3}>
                    <AssetOwnerLabel ownerType={props.plantEquipmentData.ownership_type}/>
                </GridItem>
                <GridItem title='Department' span={3}>
                    {props.department ? 
                        <DepartmentLabel department={props.department}/> :
                        <Label iconFont="not_interested" text="None" color="no-color"/>
                    }
                </GridItem>
                <GridItem title='Location'>
                    <p>{props.plantEquipmentData.location}</p>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.plantEquipmentData.notes ? props.plantEquipmentData.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentInformationDetails