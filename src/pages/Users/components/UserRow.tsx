import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import Label from "../../../components/ui/General/Label/Label"
import UserLink from "../../../components/ui/Links/UserLink"
import { DepartmentResponseData } from "../../../types/department.types"
import { UserResponseData } from "../../../types/user.types"
import UserPermissionLabel from "../../System/Users/UserPage/components/UserPermissionsLabel"

const UserRow = (props: {
    user: UserResponseData,
    department: DepartmentResponseData | undefined,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <UserLink 
                        username={props.user.data.username}
                        inactive={!props.user.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{`${props.user.data.first_name} ${props.user.data.last_name}`}</td>
            <td className="text-left">{props.user.data.user_code}</td>
            <td className="text-left"><a href={`mailto:${props.user.data.email}`}>{props.user.data.email}</a></td>
            <td className="text-left"><a href={`tel:${props.user.data.mobile}`}>{props.user.data.mobile}</a></td>
            <td className="text-left">
                {props.department ? 
                    <DepartmentLabel department={props.department}/> : 
                    <Label text="None" iconFont="not_interested" color="no-color"/>
                }
            </td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.accounts} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.calendars} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.customers} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.engineer_assets} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.engineer_data} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.iso} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.quotes} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.rams} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.stock} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.system} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.templates} hideText/></td>
            <td><UserPermissionLabel permissions={props.user.data.permissions.tickets} hideText/></td>
        </tr>
    )
}

export default UserRow