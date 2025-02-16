const formatGrossProfit = (percentage: number) => {
    return `${Math.round((percentage + Number.EPSILON) * 100) / 100}%`
}

export default formatGrossProfit