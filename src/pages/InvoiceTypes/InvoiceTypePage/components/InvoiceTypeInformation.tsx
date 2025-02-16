import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { InvoiceTypeResponseData } from "../../../../types/invoiceTypes.types"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import InvoiceTypeRateLabel from "../../components/InvoiceTypeRateLabel"

const InvoiceTypeInformation = (props: {
    invoiceType: InvoiceTypeResponseData,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.invoiceType.data.is_active ? <InactiveStatus resourceName='Invoice Type' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Invoice Type Details</h2>
                <InfoGrid>
                    <GridItem title='Name' span={4}>
                        <p>{props.invoiceType.data.name}</p>
                    </GridItem>
                    <GridItem title='Rate Type' span={2}>
                        <InvoiceTypeRateLabel isCustomerRate={props.invoiceType.data.is_customer_rate}/>
                    </GridItem>
                    <GridItem title='Charge Labour' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_labour}/>
                    </GridItem>
                    <GridItem title='Charge Expenses' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_expenses}/>
                    </GridItem>
                    <GridItem title='Charge Mileage' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_mileage}/>
                    </GridItem>
                    <GridItem title='Charge Materials' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_materials}/>
                    </GridItem>
                    <GridItem title='Charge Subcontract' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_subcontract}/>
                    </GridItem>
                    <GridItem title='Charge Hire' span={2}>
                        <BooleanLabel true={props.invoiceType.data.charge_hire}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default InvoiceTypeInformation