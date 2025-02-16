const getISOApprovalIcon = (isoApproval: boolean | null): string => {
    
    switch (isoApproval) {
        case true:
            return 'done';
        case false:
            return 'close';
        default:
            return 'pending';
    }
}

export default getISOApprovalIcon