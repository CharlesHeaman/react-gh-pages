const getInvoiceRequestStatusTitle = (isProcessed: boolean, isHolding: boolean, isApproved: boolean): string => {
    return isProcessed ? 
        'Processed' : 
        !isApproved ?
            'Awaiting Approval' :
            isHolding ?
                'Holding' : 
                'Outstanding'   
}

export default getInvoiceRequestStatusTitle