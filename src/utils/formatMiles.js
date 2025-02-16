function formatMiles(miles) {
    return Math.round((miles + Number.EPSILON) * 1) / 1
}

export default formatMiles