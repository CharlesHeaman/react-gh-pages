const getVanStockRequestStatusColor = (status: number) => {
    switch (status) {
        case -1:
            return 'red';    
        case 1:
            return 'dark-blue';
        default:
            return 'light-blue';
    }
}

export default getVanStockRequestStatusColor