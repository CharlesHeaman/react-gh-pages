const getFGasTypeColor = (fGasType: number): string => {
    switch (fGasType) {
        case 1:
            return "dark-purple";
        case 2:
            return "purple";
        default:
            return "grey";
    }
}

export default getFGasTypeColor