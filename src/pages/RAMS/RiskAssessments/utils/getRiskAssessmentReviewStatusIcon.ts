import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getRiskAssessmentReviewStatusIcon = (date: Date): string => {
    switch (getExpiryStatus(date)) {
        case -1:
            return 'assignment_late';
        case 0:
            return 'assignment_turned_in'
        default:
            return 'assignment_turned_in';
    }
}

export default getRiskAssessmentReviewStatusIcon