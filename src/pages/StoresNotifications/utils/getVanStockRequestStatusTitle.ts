const getVanStockRequestStatusTitle = (status: number) => {
    switch (status) {
        case -1:
            return 'Dismissed';    
        case 1:
            return 'Processed';
        default:
            return 'Pending';
    }
}

export default getVanStockRequestStatusTitle