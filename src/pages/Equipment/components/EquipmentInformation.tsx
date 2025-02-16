import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import NewEquipmentLink from "../../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../../components/ui/Links/SiteLink"
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { Equipment, EquipmentResponseData } from "../../../types/equipment.types"
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types"
import { RefrigerantResponseData } from "../../../types/refrigerant.types"
import { SiteResponseData } from "../../../types/sites.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import InactiveStatus from "../../Vehicles/VehiclePage/components/InactiveStatus"
import EquipmentInformationDetails from "./EquipmentInformationDetails"
import GasModuleEquipmentInformation from "./GasModuleEquipmentInformation"
import OilModuleEquipmentInformation from "./OilModuleEquipmentInformation"
import RefrigerantModuleEquipmentInformation from "./RefrigerantModuleEquipmentInformation"

const EquipmentInformation = (props: {
    equipmentData: Equipment,
    departmentData: DepartmentResponseData,
    customerData: CustomerResponseData,
    site: SiteResponseData,
    refrigerant: RefrigerantResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    manufacturer: SupplierManufacturerResponseData | undefined,
    master: EquipmentResponseData | undefined,
    equipmentTypeData: EquipmentTypeResponseData | undefined,
    lastDeactivate: Date | undefined,
    isPreview?: boolean,
}) => {

    return (
        <>
            {!props.equipmentData.is_active ? <InactiveStatus resourceName='Equipment' inactiveDate={props.lastDeactivate}/> : null}
            <EquipmentInformationDetails
                equipmentData={props.equipmentData}
                equipmentTypeData={props.equipmentTypeData}
                departmentData={props.departmentData}
                isPreview={props.isPreview}
            />
            <hr/>
            <section>
                <h2>Supplier/Manufacturer Information</h2>
                <InfoGrid>
                    <GridItem title='Supplier' span={3}>
                        <p>{props.supplier ? <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Manufacturer' span={3}>
                        <p>{props.manufacturer ? <SupplierManufacturerLink code={props.manufacturer.data.code} name={props.manufacturer.data.name}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Model Number' span={3}>
                        <p>{props.equipmentData.model_number}</p>
                    </GridItem>
                    <GridItem title='Serial Number' span={3}>
                        <p>{props.equipmentData.serial_number}</p>
                    </GridItem>
                    <GridItem title='Model Number 2' span={3}>
                        <p>{props.equipmentData.model_number_2 ? props.equipmentData.model_number_2 : 'None'}</p>
                    </GridItem>
                    <GridItem title='Serial Number 2' span={3}>
                        <p>{props.equipmentData.serial_number_2 ? props.equipmentData.serial_number_2 : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            {props.isPreview ? <>
                <hr/>
                <section>
                    <h2>Customer Information</h2>
                    <InfoGrid>
                        <GridItem title='Customer'>
                            <p><NewCustomerLink code={props.customerData.data.code} name={props.customerData.data.name}/></p>
                        </GridItem>
                        <GridItem title='Site'>
                            <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p>
                        </GridItem>
                        {/* <GridItem title='Master'>
                            <p>{props.master ? <NewEquipmentLink code={props.master.data.code}/> : 'None'}</p>
                        </GridItem> */}
                    </InfoGrid>
                </section>
            </> : null}
            {props.equipmentTypeData?.data.energy_source === 0 ? <>
                <hr/>
                <RefrigerantModuleEquipmentInformation
                    equipment={props.equipmentData}
                    refrigerant={props.refrigerant}
                /> 
            </> : null}
            {props.equipmentTypeData?.data.energy_source === 1 ? <>
                <hr/>
                <GasModuleEquipmentInformation
                    equipment={props.equipmentData}
                /> 
            </> : null}
            {props.equipmentTypeData?.data.energy_source === 2 ? <>
                <hr/>
                <OilModuleEquipmentInformation
                    equipment={props.equipmentData}
                /> 
            </> : null}

            {/* <hr/>
            <section>
            <h2>Service/Install Dates</h2>
                <InfoGrid>
                    <GridItem title='Last Service' span={3}>
                        {props.equipmentData.last_service_at ? formatDate(props.equipmentData.last_service_at) : 'None'}
                    </GridItem>
                    <GridItem title='Next Service' span={3}>
                        {props.equipmentData.next_service_at ? formatDate(props.equipmentData.next_service_at) : 'None'}
                    </GridItem>
                    <GridItem title='Install Date' span={3}>
                        {props.equipmentData.install_date ? formatDate(props.equipmentData.install_date) : 'None'}
                    </GridItem>
                </InfoGrid>
            </section> */}
        </>
    )
}

export default EquipmentInformation