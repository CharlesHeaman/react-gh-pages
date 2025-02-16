const isQuoteCustomerInformationFormValid = (
    quoteType: string,
    customerID: number | undefined, 
    siteID: number | undefined,
    contactID: number | undefined
): boolean => {
   
    return (
        customerID !== undefined && 
        (siteID !== undefined || (quoteType === "maintenance" || quoteType === "job")) &&
        contactID !== undefined
    )
   
}

export default isQuoteCustomerInformationFormValid