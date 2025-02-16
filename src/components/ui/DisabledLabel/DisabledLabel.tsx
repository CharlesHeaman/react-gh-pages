import Label from "../General/Label/Label"

const DisabledLabel = (props: {
    hideText?: boolean,
}) => {
    return (
        <Label 
            text='Disabled' 
            iconFont="cancel" 
            color="red" 
            hideText={props.hideText} 
            noBackground={props.hideText}
        />
    )
}

export default DisabledLabel