import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import CustomerAccountStatusLabel from "./CustomerAccountStatusLabel"
import IsContractedLabel from "./CustomerTypeLabel"

const CustomerRow = (props: {
    customer: CustomerResponseData,
    siteCount: number,
    equipmentCount: number,
    contactCount: number,
    contractCount: number
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <NewCustomerLink 
                        code={props.customer.data.code}
                        inactive={!props.customer.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.customer.data.name}</td>
            <td><IsContractedLabel isContracted={props.customer.data.is_contracted}/></td>
            <td><CustomerAccountStatusLabel accountsStatus={props.customer.data.accounts_status}/></td>
            <td className="text-left"><NewCustomerLink code={props.customer.data.code} text={props.siteCount.toString()} queryParameters={'showSites=true'} listIcon/></td>
            <td className="text-left"><NewCustomerLink code={props.customer.data.code} text={props.equipmentCount.toString()} queryParameters={'showEquipment=true'} listIcon/></td>
            <td className="text-left"><NewCustomerLink code={props.customer.data.code} text={props.contractCount.toString()} queryParameters={'showContracts=true'} listIcon/></td>
            <td className="text-left"><NewCustomerLink code={props.customer.data.code} text={props.contactCount.toString()} queryParameters={'showContacts=true'} listIcon/></td>
        </tr>
    )
}

export default CustomerRow