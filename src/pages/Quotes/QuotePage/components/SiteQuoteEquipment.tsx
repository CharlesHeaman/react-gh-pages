import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatHours from "../../../../utils/formatHours"
import reduceQuoteEquipmentQuantity from "../utils/reduceQuoteEquipmentQuantity"
import reduceQuoteEquipmentTotal from "../utils/reduceQuoteEquipmentTotal"
import QuoteEquipmentLineRow from "./QuoteEquipmentLineRow"

const SiteQuoteEquipment = (props: {
    quoteLines: Array<QuoteLineResponseData>,
}) => {
    return (
        <section>
            <h2>Equipment</h2>
            {props.quoteLines.length > 0 ? 
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Equipment Type</th>
                                <th>Maintenance Time</th>
                                <th>Total Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.quoteLines.map((quoteLine, index) => <QuoteEquipmentLineRow
                                quoteLine={quoteLine}
                                key={index}
                            />)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>{reduceQuoteEquipmentQuantity(props.quoteLines)}</th>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatHours(reduceQuoteEquipmentTotal(props.quoteLines))} hrs</th>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : 
                <InnerContainer>
                    <NoneFound 
                        iconFont={"local_laundry_service"} 
                        text={"No equipment found"}
                        small
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default SiteQuoteEquipment