const getISOApprovalColor = (isoApproval: boolean | null): string => {
    
    switch (isoApproval) {
        case true:
            return 'light-green';
        case false:
            return 'red';
        default:
            return 'light-blue';
    }
}

export default getISOApprovalColor