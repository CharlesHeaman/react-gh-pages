import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../components/ui/EmailLink/EmailLink"
import TelephoneLink from "../../../../components/ui/TelephoneLink/TelephoneLink"
import { SupplierManufacturer } from "../../../../types/supplierManufacturer.types"

const SupplierManufacturerAccountsInformation = (props: {
    supplierManufacturerData: SupplierManufacturer
}) => {
    return (
        <section>
            <h2>Accounts Information</h2>
            <InfoGrid>
                <GridItem title='Sage Name' span={3}>
                    <p>{props.supplierManufacturerData.sage_name ? props.supplierManufacturerData.sage_name : 'None'}</p>
                </GridItem>
                <GridItem title='Accounts Email' span={3}>
                    <p><EmailLink email={props.supplierManufacturerData.accounts_email}/></p>
                </GridItem>
                <GridItem title='Accounts Telephone' span={3}>
                    <p><TelephoneLink number={props.supplierManufacturerData.accounts_telephone}/></p>
                </GridItem>
                <GridItem title='Remittance Address' span={3}>
                    <p>{props.supplierManufacturerData.remittance_address}</p>
                </GridItem>
                <GridItem title='Accounts Notes'>
                    <p>{props.supplierManufacturerData.accounts_notes ? props.supplierManufacturerData.accounts_notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierManufacturerAccountsInformation