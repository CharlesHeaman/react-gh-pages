import Label from "../../../components/ui/General/Label/Label"

const SundryLabel = (props: {
    hideText?: boolean,
}) => {
    return (
        <Label text='Sundry' iconFont="donut_small" color="grey" hideText={props.hideText} noBackground={props.hideText}/>
    )
}

export default SundryLabel