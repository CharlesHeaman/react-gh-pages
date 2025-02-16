import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types"
import { UserResponseData } from "../../../types/user.types"
import getUserFullName from "../../../utils/getUserFullName"

export interface UserLabour {
    full_name: string,
    rate: number,
    over_time_rate: number,
    intercompany_rate: number,
    intercompany_rate_2: number,
    normal_hours: number,
    over_time_hours: number,
    double_time_hours: number,
    normal_hours_intercompany: number,
    over_time_hours_intercompany: number,
    double_time_hours_intercompany: number,
    normal_hours_intercompany_2: number,
    over_time_hours_intercompany_2: number,
    double_time_hours_intercompany_2: number,
}

const formatTicketLabour = (users: Array<UserResponseData>, engineerTime: Array<InvoiceTicketTimeResponseData>): Array<UserLabour> => {
    return users.map(user => {
        return {
            full_name: getUserFullName(user),
            rate: user.data.rate,
            intercompany_rate: user.data.intercompany_rate_1 / 100,
            intercompany_rate_2: user.data.intercompany_rate_2 / 100,
            over_time_rate: user.data.over_time_rate,
            normal_hours: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === null
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            over_time_hours: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === null
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            double_time_hours: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === null
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            normal_hours_intercompany: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === 1
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            over_time_hours_intercompany: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === 1
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            double_time_hours_intercompany: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                invoiceTime.data.is_double_time && 
                invoiceTime.data.intercompany_rate === 1
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            normal_hours_intercompany_2: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time &&
                invoiceTime.data.intercompany_rate === 2
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            over_time_hours_intercompany_2: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                invoiceTime.data.is_overtime &&
                !invoiceTime.data.is_double_time &&
                invoiceTime.data.intercompany_rate === 2
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
            double_time_hours_intercompany_2: engineerTime.filter(invoiceTime => 
                invoiceTime.data.user_id === user.id && 
                !invoiceTime.data.is_overtime &&
                invoiceTime.data.is_double_time &&
                invoiceTime.data.intercompany_rate === 2
            ).reduce((totalHours, invoiceTime) =>
                totalHours + invoiceTime.data.on_site_time + invoiceTime.data.travel_time
            , 0),
        }
    })
}

export default formatTicketLabour