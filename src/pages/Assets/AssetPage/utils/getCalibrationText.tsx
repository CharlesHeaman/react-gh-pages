import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate"

const getCalibrationText = (nextCalibration: Date | null): string => {

    const calibrationStatus = nextCalibration ? getExpiryStatus(nextCalibration) : undefined;

    switch (calibrationStatus) {
        case -1:
            return `This plant/tools was due for calibration on ${nextCalibration ? formatDate(nextCalibration) : 'unknown'}.`
        case 0:
            return `This plant/tools is due for calibration soon on ${nextCalibration ? formatDate(nextCalibration) : 'unknown'}.`
        default:
            return `This plant/tools is due for calibration on ${nextCalibration ? formatDate(nextCalibration) : 'unknown'}.`
    }
}

export default getCalibrationText