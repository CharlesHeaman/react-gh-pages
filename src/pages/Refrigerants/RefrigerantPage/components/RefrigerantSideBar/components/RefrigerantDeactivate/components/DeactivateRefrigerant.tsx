import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"

const DeactivateRefrigerant = (props: {
    show: boolean,
    hideFunc: () => void,
}) => {
    return (
        <WindowOverlay 
            title={"Deactivate Refrigerant"} 
            maxWidth={400} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <p>Are you sure you want to deactivate this refrigerant?</p>
            <SubmitButton 
                text={"Deactivate Refrigerant"} 
                color='red'
                clickFunc={() => null}            
            />
        </WindowOverlay>
    )
}

export default DeactivateRefrigerant