import Label from "../../components/ui/General/Label/Label"

const LabourTypeLabel = (props: {
    isMate: Boolean, 
    hideText?: boolean,
}) => {
    return (
        !props.isMate ? 
                <Label iconFont="person" text="Engineer" color="light-green" hideText={props.hideText}/> :
                <Label iconFont="person_add" text="Mate" color="purple" hideText={props.hideText}/>
            
    )
}

export default LabourTypeLabel