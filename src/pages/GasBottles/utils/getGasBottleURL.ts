const getGasBottleURL = (code: string, isConsumable: boolean | undefined) => {
    return `/#/${isConsumable ? 'gas_air_bottles' : 'refrigerant_bottles'}/${code}`
}

export default getGasBottleURL