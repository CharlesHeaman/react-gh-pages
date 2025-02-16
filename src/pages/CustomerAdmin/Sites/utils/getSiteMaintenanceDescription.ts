import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate";

const getSiteMaintenanceDescription = (motDueDate: Date): string => {

    const motStatus = getExpiryStatus(motDueDate);
    
    switch (motStatus) {
        case -1:
            return `This site's maintenance was due on ${formatDate(motDueDate)}.`
        case 0:
            return `This site's maintenance is due soon on ${formatDate(motDueDate)}.`
        default:
            return `This site's maintenance is due on ${formatDate(motDueDate)}.`
    }
}

export default getSiteMaintenanceDescription