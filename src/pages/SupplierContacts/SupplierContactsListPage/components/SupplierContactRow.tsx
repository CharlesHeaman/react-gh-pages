import EmailLink from "../../../../components/ui/EmailLink/EmailLink"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import TelephoneLink from "../../../../components/ui/TelephoneLink/TelephoneLink"
import { SupplierContactResponseData } from "../../../../types/supplierContact.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import SupplierContactLink from "../../components/SupplierContactLink"

const SupplierContactRow = (props: {
    supplierContact: SupplierContactResponseData,
    supplier: SupplierManufacturerResponseData | undefined
    hideSupplier?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <SupplierContactLink 
                        supplierContactID={props.supplierContact.id} 
                        name={props.supplierContact.data.name}
                        inactive={!props.supplierContact.data.is_active}
                    />
                </div>
            </td>
            {!props.hideSupplier ?
                <td className="text-left">{props.supplier ? <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/> : null}</td> :
                null
            }
            <td className="text-left">{props.supplierContact.data.email ? <EmailLink email={props.supplierContact.data.email}/> : null}</td>
            <td className="text-left">{props.supplierContact.data.telephone ? <TelephoneLink number={props.supplierContact.data.telephone}/> : null}</td>
            <td className="text-left">{props.supplierContact.data.mobile ? <TelephoneLink number={props.supplierContact.data.mobile}/> : null}</td>
        </tr>
    )
}

export default SupplierContactRow