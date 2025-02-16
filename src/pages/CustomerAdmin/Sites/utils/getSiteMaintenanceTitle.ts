import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getSiteMaintenanceTitle = (maintenanceDueDate: Date): string => {

    const motStatus = getExpiryStatus(maintenanceDueDate);

    switch (motStatus) {
        case -1:
            return 'Maintenance Due'
        case 0:
            return 'Maintenance Due Soon'
        default:
            return 'Maintenance Good'
    }
}

export default getSiteMaintenanceTitle