import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";

const getGasBottleRentalExpiry = (receivedDate: Date, rentalMonths: number): Date => {
    return getMonthRelativeDate(receivedDate, rentalMonths);
}

export default getGasBottleRentalExpiry