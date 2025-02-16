import IconButton from "../../../../../../../components/ui/Buttons/IconButton/IconButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import formatMoney from "../../../../../../../utils/formatMoney";
import { JobCost } from "../utils/calculateJobCost";

const JobCostBreakdown = (props: {
    jobCost: JobCost,
    showLabourBreakdown: () => void,
    showMileageBreakdown: () => void,
    showMaterialBreakdown: () => void,
    showSubcontractBreakdown: () => void,
    showHireBreakdown: () => void,
}) => {
    return (
        <section>
            <h2>Cost Breakdown</h2>
            <InfoGrid>
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
                                    <td className="text-right">{formatMoney(props.jobCost.labourCost)}</td>
                                    <td className="text-right">{formatMoney(props.jobCost.mileageCost)}</td>
                                    <td className="text-right">{formatMoney(props.jobCost.expensesCost)}</td>
                                    <td className="text-right">{formatMoney(props.jobCost.materialCost)}</td>
                                    <td className="text-right">{formatMoney(props.jobCost.subcontractCost)}</td>
                                    <td className="text-right">{formatMoney(props.jobCost.hireCost)}</td>
                                    <td className="text-right" style={{ fontWeight: 600, fontSize: '1em' }}>{formatMoney(props.jobCost.totalCost)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default JobCostBreakdown