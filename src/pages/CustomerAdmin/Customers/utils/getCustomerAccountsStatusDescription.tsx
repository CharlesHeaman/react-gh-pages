import formatDate from "../../../../utils/formatDate";

const getCustomerAccountsStatusDescription = (accountsStatus: number, updateDate: Date): string => {

    switch (accountsStatus) {
        case 1:
            return `Customer account's status marked as "credit check" on ${formatDate(updateDate)}.`;
        case 2:
            return `Customer account's status marked as "cash only" on ${formatDate(updateDate)}.`;
        case 3:
            return `Customer account's status marked as "credit ok" on ${formatDate(updateDate)}.`;
        default:
            return `Customer account's status marked as "on stop" on ${formatDate(updateDate)}.`;
    }
}

export default getCustomerAccountsStatusDescription