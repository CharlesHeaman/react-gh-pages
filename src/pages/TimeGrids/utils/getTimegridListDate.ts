import getDayRelativeDate from "../../../utils/getDayRelativeDate";

const getTimegridListDate = (searchDate: string | null): Date => {
    return searchDate ? 
        new Date(searchDate) : 
        new Date(getDayRelativeDate(new Date(), -1).setUTCHours(0,0,0,0));
}

export default getTimegridListDate