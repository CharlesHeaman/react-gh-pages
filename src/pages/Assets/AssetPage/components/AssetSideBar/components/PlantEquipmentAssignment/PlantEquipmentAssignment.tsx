import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { AssetResponseData } from "../../../../../../../types/asset.types";
import UnassignPlantEquipment from "./components/UnassignPlantEquipment";
import AssignPlantEquipment from "./AssignPlantEquipment";

const PlantEquipmentAssignment = (props: {
    plantEquipmentID: number,
    userID: number | null,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showAssign, setShowAssign] = useState(false);
    const [showUnassign, setShowUnassign] = useState(false);

    return (
        <>
            <SideBarModule title="Assignment">
                {!props.userID ?
                    <SideBarButton 
                        text='Assign to User' 
                        iconFont="assignment_ind" 
                        color="light-green" 
                        clickEvent={() => setShowAssign(true)}
                    />
                    :
                    <SideBarButton 
                        text='Unassign Plant/Tools' 
                        iconFont="person_off" 
                        color="dark-blue" 
                        clickEvent={() => setShowUnassign(true)}
                    />
                }
            </SideBarModule>

            <AssignPlantEquipment
                plantEquipmentID={props.plantEquipmentID}
                setPlantEquipmentData={props.setPlantEquipmentData}
                show={showAssign}
                hideFunc={() => setShowAssign(false)}
            />

            <UnassignPlantEquipment
                plantEquipmentID={props.plantEquipmentID}
                setPlantEquipmentData={props.setPlantEquipmentData}
                show={showUnassign}
                hideFunc={() => setShowUnassign(false)}
            />


        </>
    )
}

export default PlantEquipmentAssignment