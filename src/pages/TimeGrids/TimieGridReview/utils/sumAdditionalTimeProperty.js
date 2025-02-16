function sumAdditionalTimeProperty(additionalTime, name) {
    return additionalTime.reduce((sum, currentObj) => {
        return sum + parseFloat(currentObj[name]);
    }, 0)
}

export default sumAdditionalTimeProperty