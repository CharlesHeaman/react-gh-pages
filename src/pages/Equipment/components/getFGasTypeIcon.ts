const getFGasTypeIcon = (fGasType: number): string => {
    switch (fGasType) {
        case 1:
            return "ac_unit";
        case 2:
            return "kitchen";
        default:
            return "not_interested";
    }
}

export default getFGasTypeIcon