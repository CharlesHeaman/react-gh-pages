import getPostCompletionChangeRequestURL from "../utils/getPostCompletionChangerRequestURL"

const PostCompletionChangeRequestLink = (props: {
    postCompletionChangeRequestID: number,
    departmentName: string | undefined
}) => {
    return (
        <a 
            href={getPostCompletionChangeRequestURL(props.postCompletionChangeRequestID, props.departmentName)}
            className="icon-link"
        >
            <span className="material-icons">restart_alt</span>
            <span>{props.postCompletionChangeRequestID}</span>
        </a>
    )
}

export default PostCompletionChangeRequestLink