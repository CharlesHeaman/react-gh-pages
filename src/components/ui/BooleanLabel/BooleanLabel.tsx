import Label from "../General/Label/Label"

const BooleanLabel = (props: {
    true?: boolean,
    hideIcon?: boolean
}) => {
    return (
        props.true ? <Label text="Yes" color="light-green" iconFont='done' hideIcon={props.hideIcon}/> : <Label text="No" color="red" iconFont="close" hideIcon={props.hideIcon}/>
    )
}

export default BooleanLabel