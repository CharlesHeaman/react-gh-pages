const formatHours = (hours: number) => {
    return Math.round((hours + Number.EPSILON) * 4) / 4
}

export default formatHours