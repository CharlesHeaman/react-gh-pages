import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { InvoiceTicketTimeResponseData } from "../../../../../../../../types/invoiceTicketTime.types"
import { RequisitionLineResponseData } from "../../../../../../../../types/requisitionLines.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatMoney from "../../../../../../../../utils/formatMoney"
import reduceRequisitionLinesCost from "../../../../../../../Requisitions/utils/reduceRequisitionLinesCost"
import LabelIconBox from "../../../../../../../TimeGrids/TimieGridReview/components/LabelIconBox/LabelIconBox"
import getTicketTotalLabourCost from "../../../../../../utils/getTicketLabourCost"
import getTicketTotalMileageCost from "../../../../../../utils/getTicketTotalMileageCost"
import reduceEngineerTimeExpenses from "../../../../../../utils/reduceEngineerTimeExpenses"

const TicketTotalCost = (props: {
    users: Array<UserResponseData>,
    engineerTime: Array<InvoiceTicketTimeResponseData>
    mileageRate: number,
    requisitionLines: Array<RequisitionLineResponseData>
}) => {
    return (
        <section>
            <h2>Total Cost</h2>
            <InfoGrid>
                <GridItem>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr'
                    }}>  
                        <LabelIconBox 
                            label={"Labour"} 
                            text={formatMoney(getTicketTotalLabourCost(props.users, props.engineerTime))}
                            icon={"people"}
                        />
                        <LabelIconBox 
                            label={"Mileage"} 
                            text={formatMoney(getTicketTotalMileageCost(props.engineerTime, props.mileageRate))}
                            icon={"directions_car"}
                        />
                        <LabelIconBox 
                            label={"Expenses"} 
                            text={formatMoney(reduceEngineerTimeExpenses(props.engineerTime))} 
                            icon={"currency_pound"}
                        />
                    </div>
                </GridItem>
                <GridItem>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr'
                    }}>  
                        <LabelIconBox 
                            label={"Materials"} 
                            text={formatMoney(reduceRequisitionLinesCost(props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 0)))}
                            icon={"inventory"}
                        />
                        <LabelIconBox 
                            label={"Subcontract"} 
                            text={formatMoney(reduceRequisitionLinesCost(props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 1)))} 
                            icon={"engineering"}
                        />
                        <LabelIconBox 
                            label={"Hire"} 
                            text={formatMoney(reduceRequisitionLinesCost(props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 2)))} 
                            icon={"alarm_on"}
                        />
                    </div>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketTotalCost