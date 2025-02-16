import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { RequisitionLineResponseData } from "../../../../../../../../types/requisitionLines.types"
import formatMoney from "../../../../../../../../utils/formatMoney"
import RequisitionLink from "../../../../../../../Requisitions/components/RequisitionLink"
import reduceRequisitionLinesCost from "../../../../../../../Requisitions/utils/reduceRequisitionLinesCost"

const TicketHireCostBreakdown = (props: {
    hireLines: Array<RequisitionLineResponseData>,
    hireMarkup: number,
    showCharge?: boolean,
}) => {
    const totalHireCost = reduceRequisitionLinesCost(props.hireLines);

    return (
        <>
            {props.hireLines.length > 0 ?
                <>
                    <h3>Hire Cost</h3>
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
                            {props.hireLines.map((requisitionLine, index) => 
                                <tr key={index}>
                                    <td><RequisitionLink requisitionNumber={requisitionLine.data.requisition_number}/></td>
                                    <td>{requisitionLine.data.quantity}</td>
                                    <td className="text-left">{requisitionLine.data.product_description}</td>
                                    <td>{formatMoney(requisitionLine.data.nett_price)}</td>
                                    <td>{formatMoney(requisitionLine.data.nett_price * requisitionLine.data.quantity)}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th>{formatMoney(totalHireCost)}</th>
                            </tr>
                        </tfoot>
                    </table> 
                    {props.showCharge ? <>
                        <h3>Hire Charge</h3>
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
                                        <td className="text-right">{formatMoney(totalHireCost)}</td>
                                        <td className="text-right">{props.hireMarkup}%</td>
                                        <td className="text-right">{formatMoney(totalHireCost + (totalHireCost * props.hireMarkup / 100))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : null}
                </> :
                <NoneFound 
                    iconFont={"alarm_on"} 
                    text={"No hire found"}
                    small
                />
            }
        </>
    )
}

export default TicketHireCostBreakdown