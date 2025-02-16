import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import getUserFullName from "../../../utils/getUserFullName"
import InnerContainer from "../Containers/InnerContainer/InnerContainer"

const Comment = (props: {
    color: string,
    date: Date,
    text: string,
    user: UserResponseData | undefined,
    showRemove?: boolean,
    showDelete?: () => void
}) => {
    return (
        props.user ? <section>
            <InnerContainer 
                title={<div className="flex">
                    <span className="material-icons">chat</span>
                    {getUserFullName(props.user)}
                </div>}
                // color={props.color}
                headerItem={<div style={{ marginLeft: 'auto'}}>
                    {formatDate(props.date)}
                </div>}
                smallHeader
            >
                <p>{props.text}</p>

            </InnerContainer>
        </section> : null
    )
}

export default Comment