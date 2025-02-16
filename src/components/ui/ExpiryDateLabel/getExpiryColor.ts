import getExpiryStatus from "./getExpiryStatus";

const getExpiryColor = (date: Date, startDate?: boolean): string => {
    switch (getExpiryStatus(date, startDate)) {
        case -1:
            return 'red';
        case 0:
            return 'orange'
        default:
            return 'light-green';
    }
}

export default getExpiryColor