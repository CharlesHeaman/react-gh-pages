import Label from "../../components/ui/General/Label/Label"

const InvoiceTicketTimeRateLabel = (props: {
    isOverTime: Boolean, 
    isDoubleTime: Boolean,
    interCompany?: number | null, 
    hideText?: boolean,
}) => {
    return (
        props.interCompany ?
            props.isDoubleTime ? 
                <Label iconFont="looks_two" text={`Double Time IC ${props.interCompany}`} color="orange" hideText={props.hideText}/> 
                :
                props.isOverTime ?
                    <Label iconFont="more_time" text={`Overtime IC ${props.interCompany}`} color="orange" hideText={props.hideText}/> 
                    :
                    <Label iconFont="timer" text={`Normal IC ${props.interCompany}`} color="orange" hideText={props.hideText}/>
            :
            props.isDoubleTime ? 
                <Label iconFont="looks_two" text="Double Time" color="purple" hideText={props.hideText}/> 
                :
                props.isOverTime ?
                    <Label iconFont="more_time" text="Overtime" color="dark-blue" hideText={props.hideText}/> 
                    :
                    <Label iconFont="timer" text="Normal" color="light-blue" hideText={props.hideText}/>
    )
}

export default InvoiceTicketTimeRateLabel