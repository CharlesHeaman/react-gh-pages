const getAssociatedResourceTypeIcon = (resourceType: number | null) => {
    switch (resourceType) {
        case 1:
            return 'confirmation_number'
        case 2:
            return 'dataset_linked'
        case 3:
            return 'directions_car'
        case 4:
            return 'account_circle'
        case 5:
            return 'groups'
        default:
            return 'not_interested'
    }
}

export default getAssociatedResourceTypeIcon