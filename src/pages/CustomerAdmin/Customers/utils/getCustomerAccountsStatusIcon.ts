const getCustomerAccountsStatusIcon = (accountsStatus: number): string => {
    
    switch (accountsStatus) {
        case 1:
            return 'pending';
        case 2:
            return 'payments';
        case 3:
            return 'check_circle';
        default:
            return 'cancel';
    }
}

export default getCustomerAccountsStatusIcon