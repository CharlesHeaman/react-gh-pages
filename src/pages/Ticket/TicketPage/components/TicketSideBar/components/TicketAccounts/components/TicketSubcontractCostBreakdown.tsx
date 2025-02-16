import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { RequisitionLineResponseData } from "../../../../../../../../types/requisitionLines.types"
import formatMoney from "../../../../../../../../utils/formatMoney"
import RequisitionLink from "../../../../../../../Requisitions/components/RequisitionLink"
import reduceRequisitionLinesCost from "../../../../../../../Requisitions/utils/reduceRequisitionLinesCost"

const TicketSubcontractCostBreakdown = (props: {
    subcontractLines: Array<RequisitionLineResponseData>,
    subcontractMarkup: number,
    showCharge?: boolean
}) => {
    const totalSubcontractCost = reduceRequisitionLinesCost(props.subcontractLines);

    return (
        <>
            {props.subcontractLines.length > 0 ?
                <>
                    <h3>Subcontract Cost</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Requisition</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Nett Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.subcontractLines.map((requisitionLine, index) => 
                                <tr key={index}>
                                    <td><RequisitionLink requisitionNumber={requisitionLine.data.requisition_number}/></td>
                                    <td>{requisitionLine.data.quantity}</td>
                                    <td className="text-left">{requisitionLine.data.product_description}</td>
                                    <td className="text-right">{formatMoney(requisitionLine.data.nett_price)}</td>
                                    <td className="text-right">{formatMoney(requisitionLine.data.nett_price * requisitionLine.data.quantity)}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatMoney(totalSubcontractCost)}</th>
                            </tr>
                        </tfoot>
                    </table> 
                    {props.showCharge ? <>
                        <h3>Subcontract Charge</h3>
                        <div style={{ maxWidth: '300px'}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Total Cost</th>
                                        <th>Markup</th>
                                        <th>Total Charge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-right">{formatMoney(totalSubcontractCost)}</td>
                                        <td className="text-right">{props.subcontractMarkup}%</td>
                                        <td className="text-right">{formatMoney(totalSubcontractCost + (totalSubcontractCost * props.subcontractMarkup / 100))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : null}
                </> :
                <NoneFound 
                    iconFont={"engineering"} 
                    text={"No subcontract found"}
                    small
                />
            }
        </>
    )
}

export default TicketSubcontractCostBreakdown