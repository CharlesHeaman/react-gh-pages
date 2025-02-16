import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../components/ui/EmailLink/EmailLink"
import TelephoneLink from "../../../../components/ui/TelephoneLink/TelephoneLink"
import WebsiteLink from "../../../../components/ui/WebsiteLink/WebsiteLink"
import { SupplierManufacturer } from "../../../../types/supplierManufacturer.types"

const SupplierManufacturerContactInformation = (props: {
    supplierManufacturerData: SupplierManufacturer
}) => {
    return (
        <section>
            <h2>Contact Information</h2>
            <InfoGrid>
                <GridItem title='Email' span={3}>
                    <p><EmailLink email={props.supplierManufacturerData.email}/></p>
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <p><TelephoneLink number={props.supplierManufacturerData.telephone}/></p>
                </GridItem>
                <GridItem title='Website'>
                    <p>{props.supplierManufacturerData.website_url ? 
                        <WebsiteLink url={props.supplierManufacturerData.website_url}/> : 
                        'None'
                    }</p>
                    
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierManufacturerContactInformation