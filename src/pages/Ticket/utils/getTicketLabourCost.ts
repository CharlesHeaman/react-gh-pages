

import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types";
import { UserResponseData } from "../../../types/user.types";
import formatTicketLabour from "./formatTicketLabour";

const getTicketTotalLabourCost = (users: Array<UserResponseData>, engineerTime: Array<InvoiceTicketTimeResponseData>): number => {
    return formatTicketLabour(users, engineerTime).reduce((totalLabourCost, userLabour) => 
        totalLabourCost + 
        (userLabour.normal_hours * userLabour.rate) + 
        (userLabour.over_time_hours * userLabour.over_time_rate * 1.5) + 
        (userLabour.double_time_hours * userLabour.over_time_rate * 2) +
        (userLabour.normal_hours_intercompany * userLabour.rate * userLabour.intercompany_rate) + 
        (userLabour.over_time_hours_intercompany * userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate) + 
        (userLabour.double_time_hours_intercompany * userLabour.over_time_rate * 2 * userLabour.intercompany_rate) +
        (userLabour.normal_hours_intercompany_2 * userLabour.rate * userLabour.intercompany_rate_2) + 
        (userLabour.over_time_hours_intercompany_2 * userLabour.over_time_rate * 1.5 * userLabour.intercompany_rate_2) + 
        (userLabour.double_time_hours_intercompany_2 * userLabour.over_time_rate * 2 * userLabour.intercompany_rate_2)
, 0);
}

export default getTicketTotalLabourCost