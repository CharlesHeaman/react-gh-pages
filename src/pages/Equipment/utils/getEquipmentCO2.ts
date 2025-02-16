const getEquipmentCO2 = (gwp: number, refrigerantCharge: number): number => {
    return (gwp * refrigerantCharge) / 1000
}

export default getEquipmentCO2