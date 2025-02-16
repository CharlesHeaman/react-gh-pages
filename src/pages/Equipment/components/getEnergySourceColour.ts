const getEnergySourceColour = (energySource: number | null): string => {
    switch (energySource) {
        case 0:
            return "dark-blue";
        case 1:
            return "dark-purple";
        case 2:
            return "purple";
        default:
            return "grey";
    }
}

export default getEnergySourceColour