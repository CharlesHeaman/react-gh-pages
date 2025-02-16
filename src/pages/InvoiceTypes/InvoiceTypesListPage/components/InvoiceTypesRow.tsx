import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import { InvoiceTypeResponseData } from "../../../../types/invoiceTypes.types"
import InvoiceTypeLink from "../../components/InvoiceTypeLink"
import InvoiceTypeRateLabel from "../../components/InvoiceTypeRateLabel"

const InvoiceTypeRow = (props: {
    invoiceType: InvoiceTypeResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <InvoiceTypeLink 
                        invoiceTypeID={props.invoiceType.id} 
                        name={props.invoiceType.data.name}
                        inactive={!props.invoiceType.data.is_active}
                    />
                </div>
            </td>
            <td><InvoiceTypeRateLabel isCustomerRate={props.invoiceType.data.is_customer_rate}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_labour}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_expenses}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_mileage}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_materials}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_subcontract}/></td>
            <td><BooleanLabel true={props.invoiceType.data.charge_hire}/></td>
        </tr>
    )
}

export default InvoiceTypeRow