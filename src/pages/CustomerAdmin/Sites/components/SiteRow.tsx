import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import ContractLink from "../../../../components/ui/Links/ContractLink"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { ContractResponseData } from "../../../../types/contract.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { SiteResponseData } from "../../../../types/sites.types"

const SiteRow = (props: {
    site: SiteResponseData,
    department: DepartmentResponseData | undefined,
    contactCount: number,
    equipmentCount: number,
    contract: ContractResponseData | undefined,
    hideContract?: boolean,
    customer: CustomerResponseData | undefined
    hideCustomer?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <SiteLink 
                        code={props.site.data.code}
                        inactive={!props.site.data.is_active}
                    />
                </div>
            </td>
            {!props.hideCustomer ? 
                <td className="text-left">{props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : ''}</td> : 
                null
            }
            <td className="text-left">{props.site.data.name}</td>
            <td className="text-left">{props.site.data.location}</td>
            <td className="text-left">{props.site.data.description}</td>
            <td className="text-left">{props.department ? <DepartmentLabel department={props.department}/> : null}</td>
            <td className="text-left"><SiteLink code={props.site.data.code} text={props.equipmentCount.toString()} queryParameters={'showEquipment=true'} listIcon/></td>
            {!props.hideContract ? 
                <td className="text-left">{props.contract ? 
                    <ContractLink referenceNumber={props.contract.data.reference_number}/> : 
                    <Label color="grey" text="None" iconFont="not_interested"/>
                }</td> : 
                null
            }
            <td className="text-left"><SiteLink code={props.site.data.code} text={props.contactCount.toString()} queryParameters={'showContacts=true'} listIcon/></td>
        </tr>
    )
}

export default SiteRow