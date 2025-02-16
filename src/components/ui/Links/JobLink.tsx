import getJobURL from "./utils/getJobURL"

const JobLink = (props: {
    departmentName: string,
    number: string,
}) => {
    return (
        <a 
            href={getJobURL(props.departmentName, props.number)}
            className="icon-link"
        >
            <span className="material-icons">dataset_linked</span>
            <span>{props.number}</span>
        </a>
    )
}

export default JobLink