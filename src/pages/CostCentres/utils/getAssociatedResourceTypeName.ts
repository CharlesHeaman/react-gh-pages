const getAssociatedResourceTypeName = (resourceType: number | null) => {
    switch (resourceType) {
        case 1:
            return 'Tickets'
        case 2:
            return 'Jobs'
        case 3:
            return 'Vehicles'
        case 4:
            return 'Users'
        case 5:
            return 'Customers'
        default:
            return 'None'
    }
}

export default getAssociatedResourceTypeName