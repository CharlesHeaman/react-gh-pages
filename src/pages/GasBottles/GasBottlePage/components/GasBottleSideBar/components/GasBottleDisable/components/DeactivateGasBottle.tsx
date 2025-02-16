import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"

const DeactivateGasBottle = (props: {
    show: boolean,
    hideFunc: () => void,
}) => {
    return (
        <WindowOverlay 
            title={"Deactivate Gas Bottle"} 
            maxWidth={400} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <p>Are you sure you want to deactivate this gas bottle?</p>
            <SubmitButton 
                text={"Deactivate Gas Bottle"} 
                color='red'
                clickFunc={() => null}            
            />
        </WindowOverlay>
    )
}

export default DeactivateGasBottle