import Label from "../../../components/ui/General/Label/Label"

const QuoteTypeLabel = (props: {
    isProject?: boolean,
    isReactive?: boolean,
    isMaintenance?: boolean,
    hideText?: boolean
}) => {
    return props.isProject ? 
        <Label text='Project' color="dark-blue" iconFont="dataset_linked" hideText={props.hideText}/> : 
        props.isMaintenance ? 
            <Label text='Maintenance' color="light-green" iconFont="business" hideText={props.hideText}/> : 
            props.isReactive ?
            <Label text='Reactive' color="purple" iconFont="confirmation_number" hideText={props.hideText}/> :
            <Label text='Enquiry' color="dark-purple" iconFont="question_answer" hideText={props.hideText}/>
    
}

export default QuoteTypeLabel