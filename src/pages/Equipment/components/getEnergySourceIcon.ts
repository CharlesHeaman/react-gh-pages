const getEnergySourceIcon = (energySource: number | null): string => {
    switch (energySource) {
        case 0:
            return "propane";
        case 1:
            return "gas_meter";
        case 2:
            return "oil_barrel";
        case 3:
            return "electric_bolt";
        default:
            return "not_interested";
    }
}

export default getEnergySourceIcon