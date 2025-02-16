import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types";

const reduceEngineerTimeEngineerLabour = (engineerTime: Array<InvoiceTicketTimeResponseData>) => {
    return engineerTime.filter(invoiceTime => 
        !invoiceTime.data.is_mate_rate && !invoiceTime.data.is_overtime && !invoiceTime.data.is_double_time
    ).reduce((totalHours, invoiceTime) => 
        totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
    , 0);
}

export default reduceEngineerTimeEngineerLabour