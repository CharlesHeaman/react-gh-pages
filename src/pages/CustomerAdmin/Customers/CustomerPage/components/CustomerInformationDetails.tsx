import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { Customer } from "../../../../../types/customers.types"

const CustomerInformationDetails = (props: {
    customerData: Customer,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Customer Details</h2>
            <InfoGrid>
                <GridItem title='Name' span={4}>
                    <p>{props.customerData.name}</p>
                </GridItem>
                {props.isPreview ? <GridItem title='Code' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>#{props.customerData.code.toLocaleUpperCase()}</span></p>
                </GridItem> : null}
                <GridItem title='Email' span={4}>
                    <p>{props.customerData.email ? <EmailLink email={props.customerData.email}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Telephone' span={2}>
                    <p>{props.customerData.telephone ? <TelephoneLink number={props.customerData.telephone}/>: 'None'}</p>
                </GridItem>
                <GridItem title='Special Instructions'>
                    <p>{props.customerData.special_instructions ? props.customerData.special_instructions : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerInformationDetails