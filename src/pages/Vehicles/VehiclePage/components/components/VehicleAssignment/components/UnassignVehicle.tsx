import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { VehicleResponseData } from "../../../../../../../types/vehicles.types";
import putAPI from "../../../../../../../utils/putAPI";

const UnassignVehicle = (props: {
    vehicleID: number,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    
    const unassignVehicle = () => {
        putAPI(`vehicles/${props.vehicleID}/assign`, {}, {
            user_id: null
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            props.setVehicleData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Unassign Vehicle'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Unassign Vehicle"
                iconFont="person_off"
                color="dark-blue"
                clickFunc={unassignVehicle}
                submitting={isUpdating}
                submittingText="Unassigning..."
            />}
        >
            <p>Unassign user from vehicle?</p>

        </WindowOverlay>
    )
}

export default UnassignVehicle