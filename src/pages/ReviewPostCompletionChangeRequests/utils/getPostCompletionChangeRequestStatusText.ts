import formatDate from "../../../utils/formatDate";

const getPostCompletionChangeRequestStatusText = (status: number, date: Date | undefined) => {
    switch (status) {
        case -1:
            return `This post-completion completion change request was denied on ${date ? formatDate(date) : 'unknown'}.`;    
        case 1:
            return `This post-completion completion change request was accepted on ${date ? formatDate(date) : 'unknown'}.`;    
        default:
            return "This post-completion completion change request has not been processed.";    
    }
}

export default getPostCompletionChangeRequestStatusText