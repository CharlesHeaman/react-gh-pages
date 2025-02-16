const getEnergySourceText = (energySource: number | null): string => {
    switch (energySource) {
        case 0:
            return "F-Gas";
        case 1:
            return "Gas Safe";
        case 2:
            return "OFTEC";
        case 3:
            return "NICEIC";
        default:
            return "None";
    }
}

export default getEnergySourceText