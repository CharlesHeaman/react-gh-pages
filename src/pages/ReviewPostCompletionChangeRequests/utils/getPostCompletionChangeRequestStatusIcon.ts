const getPostCompletionChangeRequestStatusIcon = (status: number) => {
    switch (status) {
        case -1:
            return 'thumb_down';    
        case 1:
            return 'thumb_up';
        default:
            return 'pending';
    }
}

export default getPostCompletionChangeRequestStatusIcon