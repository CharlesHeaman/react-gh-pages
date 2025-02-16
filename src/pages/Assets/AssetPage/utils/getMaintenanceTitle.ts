import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getMaintenanceTitle = (nextMaintenance: Date | null): string => {

    const maintenanceStatus = nextMaintenance ? getExpiryStatus(nextMaintenance) : undefined;

    switch (maintenanceStatus) {
        case -1:
            return 'Maintenance Overdue'
        case 0:
            return 'Maintenance Due Soon'
        default:
            return 'Maintenance Good'
    }
}

export default getMaintenanceTitle