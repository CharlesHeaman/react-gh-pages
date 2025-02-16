import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../components/ui/EmailLink/EmailLink"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import TelephoneLink from "../../../../components/ui/TelephoneLink/TelephoneLink"
import { SupplierContact } from "../../../../types/supplierContact.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"

const SupplierContactInformation = (props: {
    supplierContactData: SupplierContact,
    supplier: SupplierManufacturerResponseData,
    lastDeactivate: Date | undefined,
    isPreview?: boolean
}) => {
    return (
        <>
            {!props.supplierContactData.is_active ? <InactiveStatus resourceName='Supplier/Manufacturer Contact' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Contact Details</h2>
                <InfoGrid>
                    <GridItem title='Name' span={3}>
                        <p>{props.supplierContactData.name}</p>
                    </GridItem>
                    <GridItem title='Email' span={3}>
                        <p>{props.supplierContactData.email ? <EmailLink email={props.supplierContactData.email}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Telephone' span={3}>
                        <p>{props.supplierContactData.telephone ? <TelephoneLink number={props.supplierContactData.telephone}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Mobile' span={3}>
                        <p>{props.supplierContactData.mobile ? <TelephoneLink number={props.supplierContactData.mobile}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Notes'>
                        <p>{props.supplierContactData.notes ? props.supplierContactData.notes : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            {props.isPreview ? <>
                <hr/>
                <section>
                    <h2>Supplier/Manufacturer Information</h2>
                    <InfoGrid>
                        <GridItem title='Supplier'>
                            <p><SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/></p>
                        </GridItem>
                    </InfoGrid>
                </section>
            </> : null}
        </>
    )
}

export default SupplierContactInformation