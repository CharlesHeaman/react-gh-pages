import IconButton from "../../../../../../../../components/ui/Buttons/IconButton/IconButton"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../../../../../../components/ui/General/Label/Label"
import { InvoiceTypeResponseData } from "../../../../../../../../types/invoiceTypes.types"
import { QuoteResponseData } from "../../../../../../../../types/quote.types"
import formatMoney from "../../../../../../../../utils/formatMoney"
import getGrossProfitMargin from "../../../../../../../../utils/getGrossProfit"
import InvoiceTypeRateLabel from "../../../../../../../InvoiceTypes/components/InvoiceTypeRateLabel"
import { TicketCost } from "../../../../../../utils/calculateTicketCost"
import GrossProfitMarginLabel from "./GrossProfitMarginLabel"

const TicketChargeBreakdown = (props: {
    invoiceType: InvoiceTypeResponseData,
    ticketCost: TicketCost,
    quote: QuoteResponseData | undefined,
    showLabourBreakdown: () => void,
    showMileageBreakdown: () => void,
    showMaterialBreakdown: () => void,
    showSubcontractBreakdown: () => void,
    showHireBreakdown: () => void,
}) => {
    const totalCharge = props.quote ? props.quote.data.value : props.ticketCost.totalCharge;

    return (
        <section>
            <h2>Cost/Charge Breakdown</h2>
            <InfoGrid>
                <GridItem title='Rate Type' span={2}>
                    <InvoiceTypeRateLabel isCustomerRate={props.invoiceType.data.is_customer_rate} isQuoted={props.quote !== undefined}/>
                </GridItem>
                <GridItem>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><div style={{ display: 'flex', alignItems: 'baseline' }}>Labour<IconButton iconFont={"help_outline"} text={""} clickFunc={props.showLabourBreakdown}/></div></th>
                                    <th><div style={{ display: 'flex', alignItems: 'baseline' }}>Mileage<IconButton iconFont={"help_outline"} text={""} clickFunc={props.showMileageBreakdown}/></div></th>
                                    <th>Expenses</th>
                                    <th><div style={{ display: 'flex', alignItems: 'baseline' }}>Material<IconButton iconFont={"help_outline"} text={""} clickFunc={props.showMaterialBreakdown}/></div></th>
                                    <th><div style={{ display: 'flex', alignItems: 'baseline' }}>Subcontract<IconButton iconFont={"help_outline"} text={""} clickFunc={props.showSubcontractBreakdown}/></div></th>
                                    <th><div style={{ display: 'flex', alignItems: 'baseline' }}>Hire<IconButton iconFont={"help_outline"} text={""} clickFunc={props.showHireBreakdown}/></div></th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)' }}>Cost</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.labourCost)}</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.mileageCost)}</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.expensesCost)}</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.materialCost)}</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.subcontractCost)}</td>
                                    <td className="text-right">{formatMoney(props.ticketCost.hireCost)}</td>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: '1em' }}>{formatMoney(props.ticketCost.totalCost)}</td>
                                </tr>
                                <tr>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)' }}>Charge</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.labourCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.mileageCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.expensesCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.materialCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.subcontractCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right">{!props.quote || true ? formatMoney(props.ticketCost.hireCharge) : <Label text="N/A" color="grey"/>}</td>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: '1em' }}>{formatMoney(totalCharge)}</td>
                                </tr>
                                <tr>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: 'var(--h3-size)' }}>GP Markup</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_labour ? getGrossProfitMargin(props.ticketCost.labourCost, props.ticketCost.labourCharge) : undefined}/></div> : null}</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_mileage ? getGrossProfitMargin(props.ticketCost.mileageCost, props.ticketCost.mileageCharge) : undefined}/></div> : null}</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_expenses ? getGrossProfitMargin(props.ticketCost.expensesCost, props.ticketCost.expensesCharge) : undefined}/></div> : null}</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_materials ? getGrossProfitMargin(props.ticketCost.materialCost, props.ticketCost.materialCharge) : undefined}/></div> : null}</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_subcontract ? getGrossProfitMargin(props.ticketCost.subcontractCost, props.ticketCost.subcontractCharge) : undefined}/></div> : null}</td>
                                    <td>{!props.quote ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GrossProfitMarginLabel grossProfitMargin={props.invoiceType.data.charge_hire ? getGrossProfitMargin(props.ticketCost.hireCost, props.ticketCost.hireCharge) : undefined}/></div> : null}</td>
                                    <td><GrossProfitMarginLabel grossProfitMargin={getGrossProfitMargin(props.ticketCost.totalCost, totalCharge)}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketChargeBreakdown