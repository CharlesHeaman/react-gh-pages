import getQuoteURL from "../utils/getQuoteURL"

const NewQuoteLink = (props: {
    departmentName: string,
    number: string,
    suffix: number,
}) => {
    return (
        <a 
            href={getQuoteURL(props.departmentName, props.number, props.suffix)}
            className='icon-link'
        >
            <span className="material-icons">request_quote</span>
            <span>{`${props.number}${props.suffix > 0 ? `/${props.suffix}` : ''}`}</span>
        </a>
    )
}

export default NewQuoteLink