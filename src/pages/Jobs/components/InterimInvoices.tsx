import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import { InterimInvoiceResponseData } from "../../../types/interimInvoice.types"
import formatDate from "../../../utils/formatDate"
import formatMoney from "../../../utils/formatMoney"
import reduceInterimInvoiceValue from "../utils/reduceInterimInvoiceValue"

const InterimInvoices = (props: {
    interimInvoices: Array<InterimInvoiceResponseData>,
}) => {
    return (
        <section>
            <h2>Interim Invoices</h2>
            {props.interimInvoices.length > 0 ?
                <InfoGrid>
                    <GridItem title='Total Interim Invoice Value'>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(reduceInterimInvoiceValue(props.interimInvoices))}</span></p>
                    </GridItem>
                    <GridItem>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Invoice Number</th>
                                        <th>Invoice Value</th>
                                        <th>Invoice Date</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.interimInvoices.map((invoice, index) => 
                                        <tr key={index}>
                                            <td>{invoice.data.invoice_number}</td>
                                            <td className="text-right">{formatMoney(invoice.data.invoice_value)}</td>
                                            <td>{formatDate(invoice.data.invoice_date)}</td>
                                            <td className="text-left">{invoice.data.notes}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                </InfoGrid>
                :
                <InnerContainer>
                    <NoneFound
                        text="No interim invoices found"
                        iconFont="redeem"
                        small                            
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default InterimInvoices