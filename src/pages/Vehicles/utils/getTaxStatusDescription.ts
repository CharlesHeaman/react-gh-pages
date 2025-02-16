import getExpiryStatus from '../../../components/ui/ExpiryDateLabel/getExpiryStatus';
import formatDate from '../../../utils/formatDate';

const getTaxStatusDescription = (taxDueDate: Date): string => {

    const taxStatus = getExpiryStatus(taxDueDate);
    
    switch (taxStatus) {
        case -1:
            return `This vehicle's tax expired on ${formatDate(taxDueDate)}.`
        case 0:
            return `This vehicle's tax will expire soon on ${formatDate(taxDueDate)}.`
        default:
            return `This vehicle's tax is good until ${formatDate(taxDueDate)}.`
    }
}

export default getTaxStatusDescription