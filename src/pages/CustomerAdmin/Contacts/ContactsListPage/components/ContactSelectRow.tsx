import DisabledLabel from "../../../../../components/ui/DisabledLabel/DisabledLabel"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { ContactResponseData } from "../../../../../types/contact.types"

const ContactRow = (props: {
    contact: ContactResponseData,
    updateSelection: (contactID: number) => void,
    selected: boolean
}) => {
    return (
        <tr
            onClick={() => props.updateSelection(props.contact.id)}
        >
            <td>
                <input 
                    type="checkbox"
                    checked={props.selected}
                />
            </td>
            <td className="text-left">
                <div className="flex">
                    {!props.contact.data.is_active ? <DisabledLabel hideText/> : ''}
                    {props.contact.data.name}
                </div>
            </td>
            <td className="text-left">{props.contact.data.email ? <EmailLink email={props.contact.data.email}/> : null}</td>
            <td className="text-left">{props.contact.data.telephone ? <TelephoneLink number={props.contact.data.telephone}/> : null}</td>
            <td className="text-left">{props.contact.data.mobile ? <TelephoneLink number={props.contact.data.mobile}/> : null}</td>
        </tr>
    )
}

export default ContactRow