const getFGasTypeText = (fGasType: number): string => {
    switch (fGasType) {
        case 1:
            return "Air Conditioning";
        case 2:
            return "Refrigeration";
        default:
            return "N/A";
    }
}

export default getFGasTypeText