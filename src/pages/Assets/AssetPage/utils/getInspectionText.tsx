import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate"

const getInspectionText = (nextInspection: Date | null): string => {

    const inspectionStatus = nextInspection ? getExpiryStatus(nextInspection) : undefined;

    switch (inspectionStatus) {
        case -1:
            return `This plant/tools was due for inspection on ${nextInspection ? formatDate(nextInspection) : 'unknown'}.`
        case 0:
            return `This plant/tools is due for inspection soon on ${nextInspection ? formatDate(nextInspection) : 'unknown'}.`
        default:
            return `This plant/tools is due for inspection on ${nextInspection ? formatDate(nextInspection) : 'unknown'}.`
    }
}

export default getInspectionText