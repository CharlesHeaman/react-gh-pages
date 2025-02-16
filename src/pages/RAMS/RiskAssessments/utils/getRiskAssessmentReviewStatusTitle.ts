import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getRiskAssessmentReviewStatusTitle = (motDueDate: Date): string => {

    const motStatus = getExpiryStatus(motDueDate);

    switch (motStatus) {
        case -1:
            return 'Expired'
        case 0:
            return 'Expiring Soon'
        default:
            return 'Good'
    }
}

export default getRiskAssessmentReviewStatusTitle