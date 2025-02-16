import getExpiryStatus from "../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getMOTStatusTitle = (motDueDate: Date): string => {

    const motStatus = getExpiryStatus(motDueDate);

    switch (motStatus) {
        case -1:
            return 'MOT Expired'
        case 0:
            return 'MOT Expiring Soon'
        default:
            return 'MOT Good'
    }
}

export default getMOTStatusTitle