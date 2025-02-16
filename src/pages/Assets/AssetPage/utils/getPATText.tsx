import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import formatDate from "../../../../utils/formatDate"

const getPATText = (nextTest: Date | null): string => {

    const patStatus = nextTest ? getExpiryStatus(nextTest) : undefined;

    switch (patStatus) {
        case -1:
            return `This plant/tools was due for PA testing on ${nextTest ? formatDate(nextTest) : 'unknown'}`
        case 0:
            return `This plant/tools is due for PA testing soon on ${nextTest ? formatDate(nextTest) : 'unknown'}`
        default:
            return `This plant/tools is due for PA testing on ${nextTest ? formatDate(nextTest) : 'unknown'}`
    }
}

export default getPATText