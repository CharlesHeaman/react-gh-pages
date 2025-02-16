import Label from "../../../components/ui/General/Label/Label"

const RefrigerantMovementLabel = (props: {
    isDecant: boolean,
    hideText?: boolean
}) => {
    return (
        props.isDecant ?
            <Label text='Decant' iconFont="arrow_back" color="red" hideText={props.hideText}/> :
            <Label text='Charge' iconFont="arrow_forward" color="dark-blue" hideText={props.hideText}/> 
        )
}

export default RefrigerantMovementLabel