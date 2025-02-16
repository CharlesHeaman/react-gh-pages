import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import ContractLink from "../../../../../components/ui/Links/ContractLink"
import NewCustomerLink from "../../../../../components/ui/Links/NewCustomerLink"
import { ContractResponseData } from "../../../../../types/contract.types"
import { CustomerResponseData } from "../../../../../types/customers.types"

const SiteCustomerInformation = (props: {
    customer: CustomerResponseData,
    contract: ContractResponseData | undefined,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Customer Information</h2>
            <InfoGrid>
                <GridItem title='Customer'>
                    <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                </GridItem>
                {!props.isPreview && <GridItem title='Contract'>
                    <p>{props.contract ? <ContractLink referenceNumber={props.contract.data.reference_number}/> : 'None'}</p>
                </GridItem>}
            </InfoGrid>
        </section>
    )
}

export default SiteCustomerInformation