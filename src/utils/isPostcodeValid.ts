const isPostcodeValid = (postcode: string): boolean => {
    const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
    return postcodeRegex.test(postcode);
}

export default isPostcodeValid