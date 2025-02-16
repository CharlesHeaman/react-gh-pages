const getLabourTypeColor = (isMate: boolean, isOutOfHours: boolean, isDoubleTime: boolean): string => {
    if (!isMate) {
        return (!isOutOfHours && !isDoubleTime) ? 'light-green' :
            !isDoubleTime ? 'orange' : 'red'    
    } else {
        return (!isOutOfHours && !isDoubleTime) ? 'light-blue' :
        !isDoubleTime ? 'dark-blue' : 'purple' 
    }
}

export default getLabourTypeColor
