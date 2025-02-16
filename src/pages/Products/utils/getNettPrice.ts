const getNettPrice = (listPrice: number, percentageDiscount: number): number => {
    return listPrice * ((100 - percentageDiscount) / 100)
}

export default getNettPrice