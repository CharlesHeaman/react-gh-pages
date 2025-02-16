import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import ContactLink from "../../../../../components/ui/Links/ContactLink"
import NewCustomerLink from "../../../../../components/ui/Links/NewCustomerLink"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { ContactResponseData } from "../../../../../types/contact.types"
import { CustomerResponseData } from "../../../../../types/customers.types"

const ContactRow = (props: {
    contact: ContactResponseData,
    customer: CustomerResponseData | undefined
    hideCustomer?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <ContactLink 
                        contactID={props.contact.id} 
                        name={props.contact.data.name}
                        inactive={!props.contact.data.is_active}
                    />
                </div>
            </td>
            {!props.hideCustomer ? 
                <td className="text-left">{props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : ''}</td> : 
                null
            }
            <td className="text-left">{props.contact.data.email ? <EmailLink email={props.contact.data.email}/> : null}</td>
            <td className="text-left">{props.contact.data.telephone ? <TelephoneLink number={props.contact.data.telephone}/> : null}</td>
            <td className="text-left">{props.contact.data.mobile ? <TelephoneLink number={props.contact.data.mobile}/> : null}</td>
        </tr>
    )
}

export default ContactRow