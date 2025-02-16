const formatWeight = (weight: number) => {
    return Math.round((weight + Number.EPSILON) * 100) / 100
}

export default formatWeight