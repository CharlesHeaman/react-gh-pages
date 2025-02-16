import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { InvoiceTicketTimeResponseData } from "../../../../../../../../types/invoiceTicketTime.types"
import formatMiles from "../../../../../../../../utils/formatMiles"
import formatMoney from "../../../../../../../../utils/formatMoney"
import getTicketTotalMileageCost from "../../../../../../utils/getTicketTotalMileageCost"
import reduceEngineerTimeMileage from "../../../../../../utils/reduceEngineerTimeMileage"

const TicketMileageCostBreakdown = (props: {
    mileageCostRate: number,
    mileageChargeRate: number,
    engineerTime: Array<InvoiceTicketTimeResponseData>,
    showCharge?: boolean,
}) => {

    const mileageCost = getTicketTotalMileageCost(props.engineerTime, props.mileageCostRate);
    const mileageCharge = getTicketTotalMileageCost(props.engineerTime, props.mileageChargeRate);

    return (
        <>
            {mileageCost > 0 ?
                <>
                    <h3>Mileage Cost</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Mileage</th>
                                <th>Cost</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-right">{formatMiles(reduceEngineerTimeMileage(props.engineerTime))} mi</td>
                                <td className="text-right">{formatMoney(props.mileageCostRate)}</td>
                                <td className="text-right">{formatMoney(mileageCost)}</td>
                            </tr>
                        </tbody>
                    </table> 
                    {props.showCharge ? <>
                        <h3>Mileage Charge</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mileage</th>
                                    <th>Charge</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-right">{formatMiles(reduceEngineerTimeMileage(props.engineerTime))} mi</td>
                                    <td className="text-right">{formatMoney(props.mileageChargeRate)}</td>
                                    <td className="text-right">{formatMoney(mileageCharge)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </> : null}
                </> :
                <NoneFound 
                    iconFont={"directions_car"} 
                    text={"No mileage found"}
                    small
                />
            }
        </>
    )
}

export default TicketMileageCostBreakdown