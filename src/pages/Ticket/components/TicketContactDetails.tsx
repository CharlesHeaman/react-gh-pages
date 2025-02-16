import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../components/ui/EmailLink/EmailLink"
import ContactLink from "../../../components/ui/Links/ContactLink"
import TelephoneLink from "../../../components/ui/TelephoneLink/TelephoneLink"
import { ContactResponseData } from "../../../types/contact.types"

const TicketContactDetails = (props: {
    contact: ContactResponseData
}) => {
    return (
        <section>
            <h2>Contact Details</h2>
            <InfoGrid>
                <GridItem title='Contact'>
                    <ContactLink contactID={props.contact.id} name={props.contact.data.name}/>
                </GridItem>
                <GridItem title='Email' span={3}>
                    <p>{props.contact.data.email ?  
                        <EmailLink email={props.contact.data.email}/> :
                        'None'
                    }</p>
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <p>{props.contact.data.telephone ? 
                        <TelephoneLink number={props.contact.data.telephone}/> : 
                        'None'
                    }</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketContactDetails