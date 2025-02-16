import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatMoney from "../../../../utils/formatMoney"
import reduceQuoteMaterialTotal from "../utils/reduceQuoteMaterialTotal"
import QuoteMaterialsLineRow from "./QuoteMaterialsLineRow"

const EquipmentQuoteMaterials = (props: {
    quoteLines: Array<QuoteLineResponseData>,
}) => {
    return (
        <section>
            <h2>Materials</h2>
            {props.quoteLines.length > 0 ? 
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Description</th>
                                <th>Rate</th>
                                <th>Mark-up</th>
                                <th>Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.quoteLines.map((quoteLine, index) => <QuoteMaterialsLineRow
                                quoteLine={quoteLine}
                                key={index}
                            />)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatMoney(reduceQuoteMaterialTotal(props.quoteLines))}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div> : 
                <InnerContainer>
                    <NoneFound 
                        iconFont={"inventory_2"} 
                        text={"No materials found"}
                        small
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default EquipmentQuoteMaterials