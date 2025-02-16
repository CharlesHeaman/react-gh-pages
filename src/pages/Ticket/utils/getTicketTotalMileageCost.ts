

import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types"
import reduceEngineerTimeMileage from "./reduceEngineerTimeMileage";

const getTicketTotalMileageCost = (engineerTime: Array<InvoiceTicketTimeResponseData>, mileageRate: number): number => {
    return reduceEngineerTimeMileage(engineerTime) * mileageRate;
}

export default getTicketTotalMileageCost