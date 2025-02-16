import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { GasBottleResponseData } from "../../../../../../../../types/gasBottle.types"
import putAPI from "../../../../../../../../utils/putAPI"

const RemoveBottleFromReturnsQueue = (props: {
    gasBottleID: number,
    show: boolean,
    hideFunc: () => void,
    current_gas_weight: number,
    tare_weight: number,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>
}) => {
    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    
    const assignToEngineer = () => {
        putAPI(`gas_bottles/${props.gasBottleID}/remove_from_queue`, {}, {}, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            props.setGasBottleData(gasBottleData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    return (
        <WindowOverlay 
            title={"Remove from Returns Queue"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Remove from Queue"} 
                iconFont="playlist_remove"
                color='red'
                clickFunc={assignToEngineer}            
                submitting={isUpdating}
                submittingText="Removing..."
            />}
        >
            <p>Remove this bottle from the returns queue?</p>
        </WindowOverlay>
    )
}

export default RemoveBottleFromReturnsQueue