import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { AssetResponseData } from "../../../../../../../../types/asset.types";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import putAPI from "../../../../../../../../utils/putAPI";
import UserSelect from "../../../../../../../../components/form/UserSelect/UserSelect";
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import TextInput from "../../../../../../../../components/form/TextInput/TextInput";

const UnassignPlantEquipment = (props: {
    plantEquipmentID: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [location, setLocation] = useState<string>('');
    
    
    const unassignPlantEquipment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`assets/${props.plantEquipmentID}/assign`, {}, {
            assigned_to_user_id: 0,
            location: location
        }, (response: any) => {
            const vehicleData: AssetResponseData = response.data;
            props.setPlantEquipmentData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = location.length > 0;

    return (
        <WindowOverlay
            title='Unassign Plant/Tools'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Unassign Plant/Tools"
                iconFont="person_off"
                color="dark-blue"
                clickFunc={unassignPlantEquipment}
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Unassigning..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Input location to unassign user from this plant/tools?</p>
                </GridItem>
                <GridItem title='Location'>
                    <TextInput 
                        name='location' 
                        label="Location"
                        value={location}
                        updateFunc={(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => setLocation(event.target.value)}
                        hasSubmitted={hasSubmitted}    
                        autoFocus    
                        required            
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default UnassignPlantEquipment