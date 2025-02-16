import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { RequisitionLineResponseData } from "../../../../../../../../types/requisitionLines.types"
import findProduct from "../../../../../../../../utils/findProduct"
import formatMoney from "../../../../../../../../utils/formatMoney"
import RequisitionLineRow from "../../../../../../../Requisitions/components/RequisitionLineRow"
import reduceRequisitionLinesCharge from "../../../../../../../Requisitions/utils/reduceRequisitionLinesCharge"
import reduceRequisitionLinesCost from "../../../../../../../Requisitions/utils/reduceRequisitionLinesCost"

const TicketMaterialCostBreakdown = (props: {
    materialLines: Array<RequisitionLineResponseData>,
    materialMarkup: number,
    showCharge?: boolean,
}) => {
    const totalMaterialCost = reduceRequisitionLinesCost(props.materialLines);
    const totalMaterialCharge = reduceRequisitionLinesCharge(props.materialLines);

    return (
        <>
            {props.materialLines.length > 0 ?
                <>
                    <h3>Material Cost</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Requisition</th>
                                <th>Quantity</th>
                                <th>Product</th>
                                <th>Catalogue Number</th>
                                <th>Description</th>
                                <th>Unit</th>
                                <th>Nett Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.materialLines.map((requisitionLine, index) => 
                                <RequisitionLineRow
                                    requisitionLine={requisitionLine}
                                    product={findProduct([], requisitionLine.data.product_id)}
                                    key={index}
                                />
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatMoney(totalMaterialCost)}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <h3>Material Charge</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Requisition</th>
                                <th>Quantity</th>
                                <th>Product</th>
                                <th>Catalogue Number</th>
                                <th>Description</th>
                                <th>Unit</th>
                                <th>Adjusted Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.materialLines.map((requisitionLine, index) => 
                                <RequisitionLineRow
                                    requisitionLine={requisitionLine}
                                    product={findProduct([], requisitionLine.data.product_id)}
                                    showAdjustedPrice
                                    key={index}
                                />
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatMoney(totalMaterialCharge)}</th>
                            </tr>
                        </tfoot>
                    </table> 
                    {props.showCharge ? <>
                        <h3>Material Charge</h3>
                        <div style={{ maxWidth: '400px'}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Total Charge</th>
                                        <th>Markup</th>
                                        <th>Marked Up Charge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-right">{formatMoney(totalMaterialCharge)}</td>
                                        <td className="text-right">{props.materialMarkup}%</td>
                                        <td className="text-right">{formatMoney(totalMaterialCharge + (totalMaterialCharge * props.materialMarkup / 100))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : null}
                </> :
                <NoneFound 
                    iconFont={"inventory_2"} 
                    text={"No materials found"}
                    small
                />
            }
        </>
    )
}

export default TicketMaterialCostBreakdown