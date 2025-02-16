const getCustomerAccountsStatusTitle = (accountsStatus: number): string => {
    
    switch (accountsStatus) {
        case 1:
            return 'Credit Check';
        case 2:
            return 'Cash Only';
        case 3:
            return 'Credit OK';
        default:
            return 'On Stop';
    }
}

export default getCustomerAccountsStatusTitle