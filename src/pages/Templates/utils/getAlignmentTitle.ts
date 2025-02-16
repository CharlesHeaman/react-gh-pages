const getAlignmentTitle = (alignment: number) => {
    switch (alignment) {
        case -1:
            return 'Left'
        case 1:
            return 'Right'
        default:
            return 'Center';
    }
}

export default getAlignmentTitle