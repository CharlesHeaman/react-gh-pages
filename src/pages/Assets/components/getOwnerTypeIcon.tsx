const getOwnerTypeIcon = (resourceType: number | null) => {
    switch (resourceType) {
        case 1:
            return 'business'
        case 2:
            return 'person'
        default:
            return 'question_mark'
    }
}

export default getOwnerTypeIcon