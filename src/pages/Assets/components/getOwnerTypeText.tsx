const getOwnerTypeText = (resourceType: number | null) => {
    switch (resourceType) {
        case 1:
            return 'Company'
        case 2:
            return 'Employee'
        default:
            return 'Unknown'
    }
}

export default getOwnerTypeText