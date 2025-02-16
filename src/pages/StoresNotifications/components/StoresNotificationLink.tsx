import getStoresNotificationURL from "../utils/getStoresNotificationURL"

const StoresNotificationLink = (props: {
    code: number,
}) => {
    return (
        <a 
            href={getStoresNotificationURL(props.code)}
            className="icon-link"
        >
            <span className="material-icons">mark_unread_chat_alt</span>
            <span>{props.code}</span>
        </a>
    )
}

export default StoresNotificationLink