import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import UserSelect from "../../../../../../../components/form/UserSelect/UserSelect";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { UserResponseData } from "../../../../../../../types/user.types";
import { VehicleResponseData } from "../../../../../../../types/vehicles.types";
import putAPI from "../../../../../../../utils/putAPI";

const AssignVehicle = (props: {
    vehicleID: number,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    
    const unassignVehicle = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`vehicles/${props.vehicleID}/assign`, {}, {
            user_id: selectedUser?.id
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            props.setVehicleData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    const formComplete = selectedUser?.id !== undefined;
    
    return (
        <WindowOverlay
            title='Assign User'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Assign User"
                iconFont="assignment_ind"
                clickFunc={unassignVehicle}
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Assigning..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a user to assign to this vehicle.</p>
                </GridItem>
                <GridItem title='User'>
                    <UserSelect 
                        selectedUser={selectedUser} 
                        setSelectedUser={setSelectedUser} 
                        hasSubmitted={hasSubmitted}        
                        required            
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AssignVehicle