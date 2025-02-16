const getPostCompletionChangeRequestURL = (postCompletionChangeRequestID: number, departmentName: string | undefined) => {
    return `/#/${departmentName ? `${departmentName}/` : ''}post_completion_change_requests/${postCompletionChangeRequestID}`
}

export default getPostCompletionChangeRequestURL