import Label from "../../../components/ui/General/Label/Label"

const SlaveQuantityLabel = (props: {
    slaveQuantity: number
}) => {
    return (
        props.slaveQuantity === 0 ? 
            <Label color="grey" text="None" iconFont="not_interested"/> :
            props.slaveQuantity < 0 ?
                <Label color="purple" text="Variable" iconFont="question_mark"/> :
                <>{props.slaveQuantity}</>
    )            
}

export default SlaveQuantityLabel