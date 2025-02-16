import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import UserSelect from "../../../../../../../components/form/UserSelect/UserSelect";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { UserResponseData } from "../../../../../../../types/user.types";
import putAPI from "../../../../../../../utils/putAPI";
import { AssetResponseData } from "../../../../../../../types/asset.types";
import TextInput from "../../../../../../../components/form/TextInput/TextInput";

const AssignPlantEquipment = (props: {
    plantEquipmentID: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    const [location, setLocation] = useState<string>('');

    const assignPlantEquipment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`assets/${props.plantEquipmentID}/assign`, {}, {
            assigned_to_user_id: selectedUser?.id,
            location: location
        }, (response: any) => {
            const vehicleData: AssetResponseData = response.data;
            props.setPlantEquipmentData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = (
        selectedUser?.id !== undefined && 
        location.length > 0
    )

    return (
        <WindowOverlay
            title='Assign User'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Assign User"
                iconFont="assignment_ind"
                clickFunc={assignPlantEquipment}
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Assigning..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a user to assign to this plant/tools?</p>
                </GridItem>
                <GridItem title='User'>
                    <UserSelect 
                        selectedUser={selectedUser} 
                        setSelectedUser={setSelectedUser} 
                        hasSubmitted={hasSubmitted}        
                        required            
                    />
                </GridItem>
                <GridItem title='Location'>
                    <TextInput 
                        name='location' 
                        label="Location"
                        value={location}
                        updateFunc={(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => setLocation(event.target.value)}
                        hasSubmitted={hasSubmitted}        
                        required            
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AssignPlantEquipment