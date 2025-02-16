import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import Label from "../../../../../components/ui/General/Label/Label"
import IconTitleText from "../../../../../components/ui/IconTitleText/IconTitleText"
import { Customer } from "../../../../../types/customers.types"
import getCustomerAccountsStatusColor from "../../utils/getCustomerAccountsStatusColour"
import getCustomerAccountsStatusDescription from "../../utils/getCustomerAccountsStatusDescription"
import getCustomerAccountsStatusIcon from "../../utils/getCustomerAccountsStatusIcon"
import getCustomerAccountsStatusTitle from "../../utils/getCustomerAccountsStatusText"

const CustomerAccountsInformation = (props: {
    customerData: Customer,
    lastAccountsUpdate: Date | undefined,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Accounts Information</h2>
            <InfoGrid>
                {!props.isPreview ? <GridItem>
                    <InnerContainer 
                        color={getCustomerAccountsStatusColor(props.customerData.accounts_status)}
                    >
                        <IconTitleText
                            iconFont={getCustomerAccountsStatusIcon(props.customerData.accounts_status)}
                            color={getCustomerAccountsStatusColor(props.customerData.accounts_status)}
                            title={getCustomerAccountsStatusTitle(props.customerData.accounts_status)}
                            text={getCustomerAccountsStatusDescription(props.customerData.accounts_status, props.lastAccountsUpdate ? props.lastAccountsUpdate : props.customerData.created_at)}
                        />
                    </InnerContainer>
                </GridItem> : null}
                {!props.isPreview ? <GridItem title='Sage Name' span={3}>
                {props.customerData.sage_name ? <p style={{ textTransform: 'uppercase' }}>{props.customerData.sage_name}</p> : <p>None</p>}
                </GridItem> : null}
                <GridItem title='Accounts Email' span={3}>
                    <p>{props.customerData.accounts_email ? <EmailLink email={props.customerData.accounts_email}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Invoice Address'>
                    <p>{props.customerData.invoice_address ? props.customerData.invoice_address : 'None'}</p>
                </GridItem>
                <GridItem title='Accounts Notes'>
                    <p>{props.customerData.accounts_notes ? props.customerData.accounts_notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerAccountsInformation