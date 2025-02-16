import { TimegridTicketTimeResponseData } from "../types/timegridTicketTime.types"

export interface ReducedTimegridTicketTime {
    on_site_time: number,
    travel_time: number,
    mileage: number,
    expenses: number,
    own_mileage: number
}

const reduceTimegridTicketTime = (timegridTicketTime: Array<TimegridTicketTimeResponseData>) => {
    return timegridTicketTime.reduce((reducedTimegridTicketTime: ReducedTimegridTicketTime, timegridTicketTime) => {
        return { 
            on_site_time: reducedTimegridTicketTime.on_site_time + timegridTicketTime.data.on_site_time,
            travel_time: reducedTimegridTicketTime.travel_time + timegridTicketTime.data.travel_time,
            mileage: reducedTimegridTicketTime.mileage + timegridTicketTime.data.mileage,
            expenses: reducedTimegridTicketTime.expenses + timegridTicketTime.data.expenses,
            own_mileage: reducedTimegridTicketTime.own_mileage + (timegridTicketTime.data.is_own_miles ? timegridTicketTime.data.mileage : 0),
        }
    }, {
        on_site_time: 0,
        travel_time: 0,
        mileage: 0,
        expenses: 0,
        own_mileage: 0
    })
}

export default reduceTimegridTicketTime