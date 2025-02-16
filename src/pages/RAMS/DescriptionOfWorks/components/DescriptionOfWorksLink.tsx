import getDescriptionOfWorksURL from "../utils/getDescriptionOfWorksURL"

const DescriptionOfWorksLink = (props: {
    descriptionOfWorksID: number,
    name: string,
}) => {
    return (
        <a 
            href={getDescriptionOfWorksURL(props.descriptionOfWorksID)}
            className="icon-link"
        >
            <span className="material-icons">subject</span>
            <span>{props.name}</span>
        </a>
    )
}

export default DescriptionOfWorksLink