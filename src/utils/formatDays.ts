const formatDays = (hours: number) => {
    return Math.round((hours + Number.EPSILON) * 100) / 100
}

export default formatDays