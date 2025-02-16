import { UserResponseData } from "../../../../../../types/user.types"
import getTimegridCode from "../../../../utils/getTimegridCode"
import getTimegridURL from "../../../../utils/getTimegridURL"

const TimegridLink = (props: {
    departmentName: string 
    user: UserResponseData,
    date: Date,
}) => {
    return (
        <a 
            href={getTimegridURL(props.departmentName, props.user.data.user_code, props.date)}
            className="icon-link"
        >
            <span className="material-icons">timer</span> 
            <span>{getTimegridCode(props.user.data.user_code, props.date)}</span>
        </a>
    )
}

export default TimegridLink