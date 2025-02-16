const CustomerLink = (props: {
    customerName: string,
    customerID: number
}) => {
    return (
        <a href={`${process.env.REACT_APP_OLD_SITE_URL}/customeradmin.asp?a=editcustomerform&customerid=${props.customerID}&st=1`}>{props.customerName}</a>
    )
}

export default CustomerLink