const getPostCompletionChangeRequestStatusColor = (status: number) => {
    switch (status) {
        case -1:
            return 'red';    
        case 1:
            return 'light-green';
        default:
            return 'light-blue';
    }
}

export default getPostCompletionChangeRequestStatusColor