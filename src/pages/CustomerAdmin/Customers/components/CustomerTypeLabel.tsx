import Label from "../../../../components/ui/General/Label/Label"

const IsContractedLabel = (props: {
    isContracted: boolean
}) => {
    return (
        props.isContracted ?
            <Label text='Contracted' color="purple" iconFont="history_edu"/> :
            <Label text='Non-contract' color="grey" iconFont="not_interested"/>
    
    )
}

export default IsContractedLabel