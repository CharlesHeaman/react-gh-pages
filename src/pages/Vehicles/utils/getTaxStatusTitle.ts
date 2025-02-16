import getExpiryStatus from "../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getTaxStatusTitle = (taxDueDate: Date): string => {

    const taxStatus = getExpiryStatus(taxDueDate);

    switch (taxStatus) {
        case -1:
            return 'Tax Expired'
        case 0:
            return 'Tax Expiring Soon'
        default:
            return 'Tax Good'
    }
}

export default getTaxStatusTitle