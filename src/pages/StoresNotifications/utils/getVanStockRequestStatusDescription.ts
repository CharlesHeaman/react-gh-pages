const getVanStockRequestStatusDescription = (status: number) => {
    switch (status) {
        case -1:
            return 'This van request was dismissed by [user].';    
        case 1:
            return 'This van request was processed by [user].';
        default:
            return 'This van request is still pending processing.';
    }
}

export default getVanStockRequestStatusDescription