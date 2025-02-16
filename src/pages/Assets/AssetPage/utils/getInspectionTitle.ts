import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getInspectionTitle = (nextInspection: Date | null): string => {

    const inspectionStatus = nextInspection ? getExpiryStatus(nextInspection) : undefined;

    switch (inspectionStatus) {
        case -1:
            return 'Inspection Overdue'
        case 0:
            return 'Inspection Due Soon'
        default:
            return 'Inspection Good'
    }
}

export default getInspectionTitle