import SubmitButton from "../../form/SubmitButton/SubmitButton"

const ClearAdvancedSearchButton = (props: {
    clearFunc: () => void
}) => {
    return (
        <SubmitButton
            text="Clear Search"
            left
            color="grey"
            iconFont="cancel"
            clickFunc={props.clearFunc}
            noSubmit
        />
    )
}

export default ClearAdvancedSearchButton