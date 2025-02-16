const getVanStockRequestStatusIcon = (status: number) => {
    switch (status) {
        case -1:
            return 'not_interested';    
        case 1:
            return 'done';
        default:
            return 'pending';
    }
}

export default getVanStockRequestStatusIcon