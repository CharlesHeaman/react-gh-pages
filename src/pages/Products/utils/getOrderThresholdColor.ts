import getOrderThresholdStatus from "./getOrderThresholdStatus";

const getOrderThresholdColor = (stockLevel: number, orderThreshold: number | null, outstandingQuantity?: number): string => {
    switch (getOrderThresholdStatus(stockLevel, orderThreshold, outstandingQuantity)) {
        case -1:
            return 'red';
        case 0:
            return 'orange'
        case 1:
            return 'light-green';
        default:
            return 'no-color';
    }
}

export default getOrderThresholdColor