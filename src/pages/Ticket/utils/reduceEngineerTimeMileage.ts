import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types";

const reduceEngineerTimeMileage = (engineerTime: Array<InvoiceTicketTimeResponseData>) => {
    return engineerTime.reduce((totalMileage, invoiceTime) => totalMileage + invoiceTime.data.mileage, 0);
}

export default reduceEngineerTimeMileage