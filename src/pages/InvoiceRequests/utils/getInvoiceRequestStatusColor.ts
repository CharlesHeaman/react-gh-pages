const getInvoiceRequestStatusColor = (isProcessed: boolean, isHolding: boolean, isApproved: boolean): string => {
    return isProcessed ? 
        'dark-blue' :
        !isApproved ? 
            'orange' :
            isHolding ? 
                'red' :
                'light-blue'
}

export default getInvoiceRequestStatusColor