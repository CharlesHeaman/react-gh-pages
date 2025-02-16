import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import NewCustomerLink from "../../../../../components/ui/Links/NewCustomerLink"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { Contact } from "../../../../../types/contact.types"
import { Customer } from "../../../../../types/customers.types"
import InactiveStatus from "../../../../Vehicles/VehiclePage/components/InactiveStatus"

const ContactInformation = (props: {
    contactData: Contact,
    customerData: Customer,
    lastDeactivate: Date | undefined,
    isPreview?: boolean
}) => {
    return (
        <>
            {!props.contactData.is_active ? <InactiveStatus resourceName='Contact' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Contact Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.contactData.name ? props.contactData.name : 'None'}</p>
                    </GridItem>
                    <GridItem title='Email'>
                        <p>{props.contactData.email ?  
                            <EmailLink email={props.contactData.email}/> :
                            'None'
                        }</p>
                    </GridItem>
                    <GridItem title='Telephone' span={3}>
                        <p>{props.contactData.telephone ? 
                            <TelephoneLink number={props.contactData.telephone}/> : 
                            'None'
                        }</p>
                    </GridItem>
                    <GridItem title='Mobile' span={3}>
                        <p>{props.contactData.mobile ? 
                            <TelephoneLink number={props.contactData.mobile}/> : 
                            'None'
                        }</p>
                    </GridItem>
                    <GridItem title='Notes'>
                        <p>{props.contactData.notes ? props.contactData.notes : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            {props.isPreview ? <>
                <hr/>
                <section>
                    <h2>Customer Information</h2>
                    <InfoGrid>
                        <GridItem title='Customer'>
                            <p><NewCustomerLink 
                                code={props.customerData.code}
                                name={props.customerData.name}
                            /></p>
                        </GridItem>
                    </InfoGrid>
                </section>
            </> : null}
        </>
    )
}

export default ContactInformation