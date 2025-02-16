const getISOApprovalText = (isoApproval: boolean | null): string => {
    
    switch (isoApproval) {
        case true:
            return 'ISO Approved';
        case false:
            return 'ISO Not Approved';
        default:
            return 'ISO Approval Pending';
    }
}

export default getISOApprovalText