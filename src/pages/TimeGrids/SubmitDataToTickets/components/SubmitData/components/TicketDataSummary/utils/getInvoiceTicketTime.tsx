import { InvoiceTicketTime } from "../../../../../ProcessTimegridPage";

const getInvoiceTicketTime = (invoiceTicketTime: InvoiceTicketTime | undefined, departmentMaxHours: number): Array<InvoiceTicketTimeSubmit> => {
    if (invoiceTicketTime === undefined) return [];
    if (invoiceTicketTime.on_site_time + invoiceTicketTime.travel_time > departmentMaxHours) {
        let normalOnSite, normalTravel, overtimeOnSite, overTimeTravel
        normalOnSite = invoiceTicketTime.on_site_time;
        normalTravel = invoiceTicketTime.travel_time;
        overtimeOnSite = 0;
        overTimeTravel = 0;
        if (normalTravel > departmentMaxHours) {
            overTimeTravel = normalTravel - departmentMaxHours;
            normalTravel = departmentMaxHours;
        }
        if (normalTravel + normalOnSite > departmentMaxHours) {
            let overtimeDifference = (normalTravel + normalOnSite) - departmentMaxHours;
            normalOnSite = normalOnSite - overtimeDifference;
            overtimeOnSite = overtimeDifference;
        }
        return [
            {
                ...invoiceTicketTime,
                on_site_time: normalOnSite,
                travel_time: normalTravel,
                mileage: invoiceTicketTime.mileage,
                expenses: invoiceTicketTime.expenses,
                is_over_time: false
            },
            {
                ...invoiceTicketTime,
                on_site_time: overtimeOnSite,
                travel_time: overTimeTravel,
                mileage: 0,
                expenses: 0,
                is_over_time: true
            }
        ]
    } else {
        return [
            {
                ...invoiceTicketTime,
                is_over_time: false
            }
        ]
    }
}

interface InvoiceTicketTimeSubmit extends InvoiceTicketTime {
    is_over_time: boolean
}


export default getInvoiceTicketTime