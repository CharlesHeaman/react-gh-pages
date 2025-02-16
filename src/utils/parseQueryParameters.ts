const parseQueryParameters = (url: string) => {
    const parameterString = url.split('?')[1]
    const parameters = parameterString.split('&').map(dataValuePair => {
        const split = dataValuePair.split('=');
        return {
            [split[0]]: split[1]
        }
    })

    
    return Object.assign.apply(Object, parameters);
}

export default parseQueryParameters