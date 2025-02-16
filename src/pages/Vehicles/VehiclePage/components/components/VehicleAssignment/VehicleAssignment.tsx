import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { VehicleResponseData } from "../../../../../../types/vehicles.types";
import AssignVehicle from "./components/AssignVehicle";
import UnassignVehicle from "./components/UnassignVehicle";

const VehicleAssignment = (props: {
    vehicleID: number,
    userID: number | null,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>
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
                        text='Unassign Vehicle' 
                        iconFont="person_off" 
                        color="dark-blue" 
                        clickEvent={() => setShowUnassign(true)}
                    />
                }
            </SideBarModule>

            <AssignVehicle
                vehicleID={props.vehicleID}
                setVehicleData={props.setVehicleData}
                show={showAssign}
                hideFunc={() => setShowAssign(false)}
            />

            <UnassignVehicle
                vehicleID={props.vehicleID}
                setVehicleData={props.setVehicleData}
                show={showUnassign}
                hideFunc={() => setShowUnassign(false)}
            />

        </>
    )
}

export default VehicleAssignment