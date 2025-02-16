const getAlignmentIcon = (alignment: number) => {
    switch (alignment) {
        case -1:
            return 'align_horizontal_left'
        case 1:
            return 'align_horizontal_right'
        default:
            return 'align_horizontal_center';
    }
}

export default getAlignmentIcon