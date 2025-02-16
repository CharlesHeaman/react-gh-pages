import { Fragment } from "react"
import Label from "../../../../../../../../components/ui/General/Label/Label"
import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { InvoiceTicketTimeResponseData } from "../../../../../../../../types/invoiceTicketTime.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatHours from "../../../../../../../../utils/formatHours"
import formatMoney from "../../../../../../../../utils/formatMoney"
import InvoiceTicketTimeRateLabel from "../../../../../../../Invoices/InvoiceTicketTimeRateLabel"
import formatTicketLabour from "../../../../../../utils/formatTicketLabour"
import getTicketTotalLabourCost from "../../../../../../utils/getTicketLabourCost"
import reduceEngineerTimeEngineerLabour from "../../../../../../utils/reduceEngineerTimeEngineerLabour"
import reduceEngineerTimeMateLabour from "../../../../../../utils/reduceEngineerTimeMateLabour"
import reduceEngineerTimeEngineerOvertimeLabour from "../../../../../../utils/reduceEngineerTimeEngineerOvertimeLabour"
import reduceMateTimeEngineerOvertimeLabour from "../../../../../../utils/reduceMateTimeEngineerOvertimeLabour"

const TicketLabourCostBreakdown = (props: {
    users: Array<UserResponseData>,
    engineerTime: Array<InvoiceTicketTimeResponseData>,
    engineerRate: number,
    mateRate: number,
    showCharge?: boolean,
}) => {
    
    // Cost
    const mappedLabour = formatTicketLabour(props.users, props.engineerTime);
    const totalLabourCost = getTicketTotalLabourCost(props.users, props.engineerTime);

    // Total Hours
    const totalEngineerHours = reduceEngineerTimeEngineerLabour(props.engineerTime);
    const totalEngineerOvertimeHours = reduceEngineerTimeEngineerOvertimeLabour(props.engineerTime);
    const totalMateHours = reduceEngineerTimeMateLabour(props.engineerTime);
    const totalMateOvertimeHours = reduceMateTimeEngineerOvertimeLabour(props.engineerTime);
    
    // Charge
    const engineerCharge = totalEngineerHours * props.engineerRate;
    const engineerOverTimeCharge = totalEngineerOvertimeHours * props.engineerRate * 1.5;
    const mateCharge = totalMateHours * props.mateRate;
    const mateOverTimeCharge = totalMateOvertimeHours * props.mateRate * 1.5;

    return (
        <>
            {mappedLabour.length > 0 ? 
                <>
                    <h3>Labour Cost</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedLabour.map((userLabour, index) => 
                                <Fragment key={index}>
                                    {userLabour.normal_hours > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={false}/></td>
                                        <td className="text-right">{formatHours(userLabour.normal_hours)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.normal_hours * userLabour.rate)}</td>
                                    </tr> : null}
                                    {userLabour.over_time_hours > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={true} isDoubleTime={false}/></td>
                                        <td className="text-right">{formatHours(userLabour.over_time_hours)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 1.5)}</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_hours * userLabour.over_time_rate * 1.5)}</td>
                                    </tr> : null}
                                    {userLabour.double_time_hours > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={true}/></td>
                                        <td className="text-right">{formatHours(userLabour.double_time_hours)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 2)}</td>
                                        <td className="text-right">{formatMoney(userLabour.double_time_hours * userLabour.over_time_rate * 2)}</td>
                                    </tr> : null}
                                    {userLabour.normal_hours_intercompany > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={false} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.normal_hours_intercompany)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.rate * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.normal_hours * userLabour.rate * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                    {userLabour.over_time_hours_intercompany > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={true} isDoubleTime={false} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.over_time_hours_intercompany)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_hours * userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                    {userLabour.double_time_hours_intercompany > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={true} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.double_time_hours_intercompany)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 2 * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.double_time_hours * userLabour.over_time_rate * 2 * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                    {userLabour.normal_hours_intercompany_2 > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={false} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.normal_hours_intercompany_2)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.rate * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.normal_hours * userLabour.rate * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                    {userLabour.over_time_hours_intercompany_2 > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={true} isDoubleTime={false} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.over_time_hours_intercompany_2)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_hours * userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                    {userLabour.double_time_hours_intercompany_2 > 0 ? <tr>
                                        <td><InvoiceTicketTimeRateLabel isOverTime={false} isDoubleTime={true} interCompany={1}/></td>
                                        <td className="text-right">{formatHours(userLabour.double_time_hours_intercompany_2)} hrs</td>
                                        <td className="text-right">{formatMoney(userLabour.over_time_rate * 2 * userLabour.intercompany_rate)}</td>
                                        <td className="text-right">{formatMoney(userLabour.double_time_hours * userLabour.over_time_rate * 2 * userLabour.intercompany_rate)}</td>
                                    </tr> : null}
                                </Fragment>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className="text-right">{formatMoney(totalLabourCost)}</th>
                            </tr>
                        </tfoot>
                    </table> 
                    {props.showCharge ? <>
                        <h3>Labour Charge</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Charge</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Label iconFont="person" text="Engineer" color="light-green"/></td>
                                    <td className="text-right">{totalEngineerHours} hrs</td>
                                    <td className="text-right">{formatMoney(props.engineerRate)}</td>
                                    <td className="text-right">{formatMoney(engineerCharge)}</td>
                                </tr>
                                {totalEngineerOvertimeHours > 0 && <tr>
                                    <td><Label iconFont="person" text="Engineer OT" color="dark-blue"/></td>
                                    <td className="text-right">{totalEngineerOvertimeHours} hrs</td>
                                    <td className="text-right">{formatMoney(props.engineerRate * 1.5)}</td>
                                    <td className="text-right">{formatMoney(engineerOverTimeCharge)}</td>
                                </tr>}
                                {totalMateHours > 0 && <tr>
                                    <td><Label iconFont="person_add" text="Mate" color="purple"/></td>
                                    <td className="text-right">{totalMateHours} hrs</td>
                                    <td className="text-right">{formatMoney(props.mateRate)}</td>
                                    <td className="text-right">{formatMoney(mateCharge)}</td>
                                </tr>}
                                {totalMateOvertimeHours > 0 && <tr>
                                    <td><Label iconFont="person_add" text="Mate OT" color="dark-purple"/></td>
                                    <td className="text-right">{totalMateOvertimeHours} hrs</td>
                                    <td className="text-right">{formatMoney(props.mateRate * 1.5)}</td>
                                    <td className="text-right">{formatMoney(mateOverTimeCharge)}</td>
                                </tr>}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <th className="text-right">{formatMoney(engineerCharge + mateCharge + engineerOverTimeCharge + mateOverTimeCharge)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </> : null}
                </>
                :
                <NoneFound 
                    iconFont={"people"} 
                    text={"No labour found"}
                    small
                />
            }
        </>
    )
}

export default TicketLabourCostBreakdown 