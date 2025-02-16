import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import ExpiryDateLabel from "../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import ContractLink from "../../../components/ui/Links/ContractLink"
import { ContractResponseData } from "../../../types/contract.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types"
import CustomerAccountStatusLabel from "../../CustomerAdmin/Customers/components/CustomerAccountStatusLabel"
import InvoiceTypeLabel from "../../InvoiceRequests/components/InvoiceTypeLabel"

const TicketAccountsDetails = (props: {
    contract: ContractResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined,
    customer: CustomerResponseData,
    purchaseOrderNumber: string | null,
    isQuoted: boolean,
}) => {
    return (
        <section>
            <h2>Accounts Information</h2>
            <InfoGrid>
                {props.contract ? 
                    <>
                        <GridItem title='Contract' span={2}>
                            <p><ContractLink referenceNumber={props.contract.data.reference_number}/></p>
                        </GridItem>
                        <GridItem title='Contract Start' span={2}>
                            <p><ExpiryDateLabel date={props.contract.data.start_at} startDate/></p>
                        </GridItem>
                        <GridItem title='Contract End' span={2}>
                            <p><ExpiryDateLabel date={props.contract.data.end_at}/></p>
                        </GridItem>
                    </> :
                    <GridItem title='Contract'>
                        <p>None</p>
                    </GridItem>
                }               
                <GridItem title='Invoice Type' span={2}>
                    {props.invoiceType ? <InvoiceTypeLabel invoiceType={props.invoiceType} isQuoted={props.isQuoted}/> : 'None'}
                </GridItem>
                <GridItem title='Accounts Status' span={2}>
                    <CustomerAccountStatusLabel accountsStatus={props.customer.data.accounts_status}/>
                </GridItem>
                <GridItem title='Purchase Order Number' span={2}>
                    <p>{props.purchaseOrderNumber ? props.purchaseOrderNumber : 'None'}</p>
                </GridItem>
                <GridItem title='Sage Name' span={2}>
                    <p>{props.customer.data.sage_name ? props.customer.data.sage_name : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketAccountsDetails