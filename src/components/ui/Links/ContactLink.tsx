import DisabledLabel from "../DisabledLabel/DisabledLabel"
import getContactURL from "./utils/getContactURL"

const ContactLink = (props: {
    contactID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getContactURL(props.contactID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">contact_phone</span> :
                <DisabledLabel hideText/>
            } 
            <span>{props.name}</span>
        </a>
    )
}

export default ContactLink