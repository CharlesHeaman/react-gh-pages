import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import ContractLink from "../../../../components/ui/Links/ContractLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { ContractResponseData } from "../../../../types/contract.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { SiteResponseData } from "../../../../types/sites.types"

const SiteSelectRow = (props: {
    site: SiteResponseData,
    department: DepartmentResponseData | undefined,
    updateSelection: (siteID: number) => void,
    hideDepartment?: boolean,
    contract: ContractResponseData | undefined,
    hideContract?: boolean,
    selected: boolean
}) => {
    return (
        <tr
            onClick={() => props.updateSelection(props.site.id)}
        >
            <td>
                <input 
                    type="checkbox"
                    checked={props.selected}
                />
            </td>
            <td className="text-left">
                <div className="flex">
                    <SiteLink 
                        code={props.site.data.code}
                        inactive={!props.site.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.site.data.name}</td>
            <td className="text-left">{props.site.data.location}</td>
            <td className="text-left">{props.site.data.description}</td>
            {!props.hideDepartment ? <td className="text-left">{props.department ? <DepartmentLabel department={props.department}/>  : null}</td> : null}
            {!props.hideContract ? 
                <td className="text-left">{props.contract ? 
                    <ContractLink referenceNumber={props.contract.data.reference_number}/> : 
                    <Label color="grey" text="None" iconFont="not_interested"/>
                }</td> : 
                null
            }
        </tr>
    )
}

export default SiteSelectRow