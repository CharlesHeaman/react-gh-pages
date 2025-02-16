const getObjectHasValue = (object: any) => {
    return Object.entries(object).filter((param: [string, any]) => param[1] !== undefined).length > 0;
}

export default getObjectHasValue;