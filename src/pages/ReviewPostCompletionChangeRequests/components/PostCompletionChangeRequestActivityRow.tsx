import UserLink from "../../../components/ui/Links/UserLink"
import { PostCompletionChangeRequestActivityResponseData } from "../../../types/postCompletionChangeRequestActivity.types"
import { UserResponseData } from "../../../types/user.types"
import formatDateTimestamp from "../../../utils/formatTimestamp"
import PostCompletionChangeRequestActivityLabel from "./PostCompletionChangeRequestActivityLabel"

const PostCompletionChangeRequestActivityRow = (props: {
    postCompletionChangeRequestActivity: PostCompletionChangeRequestActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><PostCompletionChangeRequestActivityLabel action={props.postCompletionChangeRequestActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.postCompletionChangeRequestActivity.data.created_at)}</td>
        </tr>
    )
}

export default PostCompletionChangeRequestActivityRow