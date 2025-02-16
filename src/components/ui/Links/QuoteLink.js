function QuoteLink(props) {
    return (
        <a href={`${process.env.REACT_APP_OLD_SITE_URL}/quotelogFresh.asp?a=editQuote&quoteID=${props.id}`}>
            {`${props.number}${props.suffix > 0 ? `/${props.suffix}` : ''}`}
        </a>
    )
}

export default QuoteLink