import ActionButton from "../../../../../../../../components/form/ActionButton/ActionButton"

const SetTareWeightButton = (props: {
    clickFunc: () => void
}) => {
    return (
        <ActionButton 
            text={"Tare Weight"} 
            color={"dark-blue"} 
            iconFont="scale" 
            clickFunc={props.clickFunc}
        />
    )
}

export default SetTareWeightButton