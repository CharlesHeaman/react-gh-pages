const getQuoteLabourTypeText = (isOutOfHours: boolean, isDoubleTime: boolean) => {
    return (!isOutOfHours&& !isDoubleTime) ? '' :
        !isDoubleTime ? 'Out of Hours' : 'Double Time'
}

export default getQuoteLabourTypeText