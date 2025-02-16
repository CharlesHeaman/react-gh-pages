import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getCalibrationTitle = (nextCalibration: Date | null): string => {

    const calibrationStatus = nextCalibration ? getExpiryStatus(nextCalibration) : undefined;

    switch (calibrationStatus) {
        case -1:
            return 'Calibration Overdue'
        case 0:
            return 'Calibration Due Soon'
        default:
            return 'Calibration Good'
    }
}

export default getCalibrationTitle