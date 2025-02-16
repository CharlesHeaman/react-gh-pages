const getQuoteURL = (departmentName: string, number: string, suffix: number) => {
    return `/#/${departmentName}/quotes/${number}/${suffix}`
}

export default getQuoteURL