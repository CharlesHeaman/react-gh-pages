import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import ContractLink from "../../../../components/ui/Links/ContractLink"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import { ContractResponseData } from "../../../../types/contract.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"
import DepartmentLink from "../../../System/Departments/DepartmentLink"

const ContractRow = (props: {
    contract: ContractResponseData,
    department: DepartmentResponseData | undefined,
    customer: CustomerResponseData | undefined
    hideCustomer?: boolean,
    sitesCount: number,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <ContractLink 
                        referenceNumber={props.contract.data.reference_number}
                        inactive={!props.contract.data.is_active}
                    />
                </div>
            </td>
            {!props.hideCustomer ? 
                <td className="text-left">{props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : ''}</td> : 
                null
            }
            <td>{props.department ? <DepartmentLabel department={props.department}/> : null}</td>
            <td className="text-right">{formatMoney(props.contract.data.contract_value)}</td>
            <td><ExpiryDateLabel date={props.contract.data.start_at} startDate/></td>
            <td><ExpiryDateLabel date={props.contract.data.end_at}/></td>
            <td><ContractLink referenceNumber={props.contract.data.reference_number} text={props.sitesCount.toString()} queryParameters="showSites=true" listIcon/></td>

        </tr>
    )
}

export default ContractRow