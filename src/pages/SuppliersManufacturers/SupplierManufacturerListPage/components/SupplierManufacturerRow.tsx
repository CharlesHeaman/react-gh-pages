import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import Label from "../../../../components/ui/General/Label/Label"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import SupplierManufacturerApprovedLabel from "../../components/SupplierManufacturerApprovedLabel"


const SupplierManufacturerRow = (props: {
    supplierManufacturer: SupplierManufacturerResponseData,
    contactCount: number,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <SupplierManufacturerLink 
                        code={props.supplierManufacturer.data.code}
                        inactive={!props.supplierManufacturer.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.supplierManufacturer.data.name}</td>
            <td className="text-left"><SupplierManufacturerLink code={props.supplierManufacturer.data.code} text={props.contactCount.toString()} queryParameters="showContacts=true" listIcon/></td>
            <td className="text-left">{props.supplierManufacturer.data.sage_name}</td>
            <td><div style={{ display: 'flex', gap: 'var(--small-gap)'}}>
                {props.supplierManufacturer.data.is_supplier ? <Label text="Supplier" iconFont="warehouse" color="no-color" hideText/> : <span style={{ width: '34px'}}></span>}
                {props.supplierManufacturer.data.is_manufacturer ? <Label text="Manufacturer" iconFont="construction" color="no-color" hideText/> : <span style={{ width: '34px'}}></span>}
                {props.supplierManufacturer.data.is_sub_contractor ? <Label text="Sub-contractor" iconFont="engineering" color="no-color" hideText/> : <span style={{ width: '34px'}}></span>}
                {props.supplierManufacturer.data.is_gas_supplier ? <Label text="Gas Supplier" iconFont="propane" color="no-color hideText" hideText/> : <span style={{ width: '34px'}}></span>}
            </div></td>
            <td><SupplierManufacturerApprovedLabel is_approved={props.supplierManufacturer.data.is_approved}/></td>
        </tr>
    )
}

export default SupplierManufacturerRow