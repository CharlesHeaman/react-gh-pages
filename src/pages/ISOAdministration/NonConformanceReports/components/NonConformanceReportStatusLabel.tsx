import Label from "../../../../components/ui/General/Label/Label"

const NonConformanceReportStatusLabel = (props: {
    isProcessed: boolean,
    hideText?: boolean
}) => {
    return (
        props.isProcessed ?
            <Label text='Processed' color='dark-blue' iconFont='check_circle' hideText={props.hideText}/> : 
            <Label text='Pending' color='light-blue' iconFont='pending' hideText={props.hideText}/>
    )
}

export default NonConformanceReportStatusLabel