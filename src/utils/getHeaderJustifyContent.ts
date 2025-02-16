const getHeaderJustifyContent = (alignment: number) => {
    switch (alignment) {
        case -1:
            return 'flex-start'
        case 1:
            return 'flex-end'
        default:
            return 'center'

    }
}

export default getHeaderJustifyContent