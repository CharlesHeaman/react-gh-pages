const getPostCompletionChangeRequestStatusTitle = (status: number) => {
    switch (status) {
        case -1:
            return 'Denied';    
        case 1:
            return 'Accepted';
        default:
            return 'Pending';
    }
}

export default getPostCompletionChangeRequestStatusTitle