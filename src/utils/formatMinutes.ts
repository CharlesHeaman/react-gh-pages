const formatMinutes = (minutes: number) => {
    return Math.round((minutes + Number.EPSILON) * 1) / 1
}

export default formatMinutes