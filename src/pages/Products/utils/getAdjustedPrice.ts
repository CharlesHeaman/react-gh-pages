const getAdjustedPrice = (listPrice: number, percentageMarkup: number): number => {
    return listPrice * ((100 + percentageMarkup) / 100)
}

export default getAdjustedPrice