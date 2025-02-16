const getCustomerAccountsStatusColor = (accountsStatus: number): string => {
    
    switch (accountsStatus) {
        case 1:
            return 'light-blue';
        case 2:
            return 'orange';
        case 3:
            return 'light-green';
        default:
            return 'red';
    }
}

export default getCustomerAccountsStatusColor