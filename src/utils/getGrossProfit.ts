const getGrossProfitMargin = (cost: number, charge: number) => {
    const profit = charge - cost; 
    return profit / cost * 100;
}

export default getGrossProfitMargin