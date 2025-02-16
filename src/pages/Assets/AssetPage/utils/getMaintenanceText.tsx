import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate"

const getMaintenanceText = (nextMaintenance: Date | null): string => {

    const maintenanceStatus = nextMaintenance ? getExpiryStatus(nextMaintenance) : undefined;

    switch (maintenanceStatus) {
        case -1:
            return `This plant/tools was due for maintenance on ${nextMaintenance ? formatDate(nextMaintenance) : 'unknown'}.`
        case 0:
            return `This plant/tools is due for maintenance soon on ${nextMaintenance ? formatDate(nextMaintenance) : 'unknown'}.`
        default:
            return `This plant/tools is due for maintenance on ${nextMaintenance ? formatDate(nextMaintenance) : 'unknown'}.`
    }
}

export default getMaintenanceText