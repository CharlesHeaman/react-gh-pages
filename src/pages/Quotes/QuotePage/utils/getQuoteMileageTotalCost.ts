const getQuoteMileageTotalCost = (miles: number, mileageRate: number, visits: number, vans: number) => {
    return miles * mileageRate * visits * vans
}

export default getQuoteMileageTotalCost