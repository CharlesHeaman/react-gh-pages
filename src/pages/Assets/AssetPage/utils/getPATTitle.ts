import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";

const getPATTitle = (nextTest: Date | null): string => {

    const patStatus = nextTest ? getExpiryStatus(nextTest) : undefined;

    switch (patStatus) {
        case -1:
            return 'PA Test Overdue'
        case 0:
            return 'PA Test Due Soon'
        default:
            return 'PA Test Good'
    }
}

export default getPATTitle