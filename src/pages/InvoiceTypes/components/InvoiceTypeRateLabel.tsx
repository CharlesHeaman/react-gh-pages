import Label from "../../../components/ui/General/Label/Label"

const InvoiceTypeRateLabel = (props: {
    isCustomerRate: Boolean,
    isQuoted?: boolean
}) => {
    return (
        !props.isQuoted ?         
            props.isCustomerRate ?
            <Label iconFont="groups" text="Non-contract" color="dark-blue"/> :
            <Label iconFont="history_edu" text="Contract" color="purple"/>
            :
            <Label text='N/A' color="grey"/>
    )
}

export default InvoiceTypeRateLabel