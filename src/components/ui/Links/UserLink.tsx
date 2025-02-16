import DisabledLabel from "../DisabledLabel/DisabledLabel";
import getUserURL from "./utils/getUserURL"

const UserLink = (props: {
    username: string,
    firstName?: string,
    lastName?: string,
    inactive?: boolean,
}) => {
    const getLinkText = (): string => {
        if (props.firstName && props.lastName) return `${props.firstName} ${props.lastName}`;
        return props.username;
    }
    return (
        <a 
            href={getUserURL(props.username)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">account_circle</span> :
                <DisabledLabel hideText/>
            }   
            <span>{getLinkText()}</span>
        </a>
    )
}

export default UserLink