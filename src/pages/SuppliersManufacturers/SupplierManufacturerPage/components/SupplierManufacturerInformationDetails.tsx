import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import { SupplierManufacturer } from "../../../../types/supplierManufacturer.types"

const SupplierManufacturerInformationDetails = (props: {
    supplierManufacturerData: SupplierManufacturer,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Supplier/Manufacturer Details</h2>
            <InfoGrid>
                <GridItem title='Name' span={4}>
                    <p>{props.supplierManufacturerData.name}</p>
                </GridItem>
                {props.isPreview && <GridItem title='Code' span={2}>
                    <p>#{props.supplierManufacturerData.code.toLocaleUpperCase()}</p>
                </GridItem>}
                <GridItem title='Address' span={4}>
                    <p>{props.supplierManufacturerData.address}</p>
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <p>{props.supplierManufacturerData.postcode}</p>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.supplierManufacturerData.notes ? props.supplierManufacturerData.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierManufacturerInformationDetails