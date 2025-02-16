import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatHours from "../../../../utils/formatHours"
import formatMoney from "../../../../utils/formatMoney"
import getQuotedEquipmentMaxHours from "../utils/getQuotedEquipmentMaxHours"
import getQuotedEquipmentMaxTravelHours from "../utils/getQuotedEquipmentMaxTravelHours"
import getQuoteMileageTotalCost from "../utils/getQuoteMileageTotalCost"
import getQuoteTravelTotalCost from "../utils/getQuoteTravelTotalCost"
import getVisitsMax from "../utils/getVisitsMax"
import reduceQuoteLabourTotal from "../utils/reduceQuoteLabourTotal"
import reduceQuoteMaterialTotal from "../utils/reduceQuoteMaterialTotal"

const EquipmentQuoteTotalBreakdown = (props: {
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
    quoteLines: Array<QuoteLineResponseData>,
    isSite?: boolean
}) => {
    // Materials
    const materialTotal = reduceQuoteMaterialTotal(props.quoteLines);

    // Labour
    const labourTotal = reduceQuoteLabourTotal(props.equipmentQuoteDetails);
    
    // Travel/Mileage
    const travelTotal = getQuoteTravelTotalCost(props.equipmentQuoteDetails);
    
    const mileageTotal = getQuoteMileageTotalCost(
        props.equipmentQuoteDetails.data.mileage, 
        props.equipmentQuoteDetails.data.mileage_rate, 
        getVisitsMax(props.equipmentQuoteDetails.data.visits), 
        props.equipmentQuoteDetails.data.number_of_vans
    );    
    
    // Max Labour 
    const maxHours = getQuotedEquipmentMaxHours(props.equipmentQuoteDetails);
    const travelTime = getQuotedEquipmentMaxTravelHours(props.equipmentQuoteDetails);

    return (
        <section>
            <h2>{!props.isSite ? 'Equipment' : 'Site'} Quote</h2>
            <InfoGrid>
                <GridItem title='Value' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(labourTotal + materialTotal + mileageTotal + travelTotal)}</span></p>
                </GridItem>
                <GridItem title='Labour' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatHours(maxHours)} hrs</span></p>
                </GridItem>
                <GridItem title='Travel' span={2}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatHours(travelTime)} hrs</span></p>
                </GridItem>
                <GridItem title='Materials' span={2}>
                    <p>{formatMoney(materialTotal)}</p>
                </GridItem>
                <GridItem title='Labour' span={2}>
                    <p>{formatMoney(labourTotal)}</p>
                </GridItem>
                <GridItem title='Travel' span={2}>
                    <p>{formatMoney(mileageTotal + travelTotal)}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentQuoteTotalBreakdown