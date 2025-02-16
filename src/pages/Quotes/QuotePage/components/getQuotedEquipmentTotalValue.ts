import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import { QuoteLineResponseData } from "../../../../types/quoteLine.types";
import getQuoteMileageTotalCost from "../utils/getQuoteMileageTotalCost";
import getQuoteTravelTotalCost from "../utils/getQuoteTravelTotalCost";
import getVisitsMax from "../utils/getVisitsMax";
import reduceQuoteLabourTotal from "../utils/reduceQuoteLabourTotal";
import reduceQuoteMaterialTotal from "../utils/reduceQuoteMaterialTotal";

const getQuotedEquipmentTotalValue = (
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
    quoteLines: Array<QuoteLineResponseData>,
): number => {
    // Materials
    const materialTotal = reduceQuoteMaterialTotal(quoteLines);

    // Labour
    const labourTotal = reduceQuoteLabourTotal(equipmentQuoteDetails);

    // Travel/Mileage
    const travelTotal = getQuoteTravelTotalCost(equipmentQuoteDetails);
    
    const mileageTotal = getQuoteMileageTotalCost(
        equipmentQuoteDetails.data.mileage, 
        equipmentQuoteDetails.data.mileage_rate, 
        getVisitsMax(equipmentQuoteDetails.data.visits), 
        equipmentQuoteDetails.data.number_of_vans
    );  

    return labourTotal + materialTotal + mileageTotal + travelTotal
}

export default getQuotedEquipmentTotalValue