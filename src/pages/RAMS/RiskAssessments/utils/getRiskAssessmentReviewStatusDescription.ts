import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate";

const getRiskAssessmentReviewStatusDescription = (motDueDate: Date): string => {

    const riskAssessmentReviewStatus = getExpiryStatus(motDueDate);
    
    switch (riskAssessmentReviewStatus) {
        case -1:
            return `This risk assessment's review expired on ${formatDate(motDueDate)}.`
        case 0:
            return `This risk assessment's review will expire soon on ${formatDate(motDueDate)}.`
        default:
            return `This risk assessment's review is good until ${formatDate(motDueDate)}.`
    }
}

export default getRiskAssessmentReviewStatusDescription