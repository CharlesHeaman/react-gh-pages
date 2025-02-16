import UserLink from "../../../../components/ui/Links/UserLink"
import { SiteActivityResponseData } from "../../../../types/siteActivity.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDateTimestamp from "../../../../utils/formatTimestamp"
import SiteActivityLabel from "./SiteActivityLabel"

const SiteActivityRow = (props: {
    siteActivity: SiteActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><SiteActivityLabel action={props.siteActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.siteActivity.data.created_at)}</td>
        </tr>
    )
}

export default SiteActivityRow