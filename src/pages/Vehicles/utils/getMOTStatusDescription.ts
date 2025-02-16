import getExpiryStatus from '../../../components/ui/ExpiryDateLabel/getExpiryStatus';
import formatDate from '../../../utils/formatDate';

const getMOTStatusDescription = (motDueDate: Date): string => {

    const motStatus = getExpiryStatus(motDueDate);
    
    switch (motStatus) {
        case -1:
            return `This vehicle's MOT expired on ${formatDate(motDueDate)}.`
        case 0:
            return `This vehicle's MOT will expire soon on ${formatDate(motDueDate)}.`
        default:
            return `This vehicle's MOT is good until ${formatDate(motDueDate)}.`
    }
}

export default getMOTStatusDescription