const getInvoiceRequestStatusIcon = (isProcessed: boolean, isHolding: boolean, isApproved: boolean): string => {
    return isProcessed ? 
        'check_circle' :
        !isApproved ?
            'hourglass_empty' : 
            isHolding ? 
                'pan_tool' :
                'pending'
}

export default getInvoiceRequestStatusIcon