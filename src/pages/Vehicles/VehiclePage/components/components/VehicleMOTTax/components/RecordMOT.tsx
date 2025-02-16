import { Dispatch, SetStateAction, useState } from "react";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { VehicleResponseData } from "../../../../../../../types/vehicles.types";
import getYearRelativeDate from "../../../../../../../utils/getYearRelativeDate";
import putAPI from "../../../../../../../utils/putAPI";
import updateStateDateParams from "../../../../../../../utils/updateStateParams/updateStateDateParams";

const RecordMOT = (props: {
    vehicleID: number,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({
        mot_due_date: getYearRelativeDate(new Date(), 1),
    });
    
    const recordMOT = () => {
        putAPI(`vehicles/${props.vehicleID}/record_mot`, {}, {
            mot_due_date: vehicleDetails.mot_due_date
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            props.setVehicleData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Record MOT'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Record MOT"
                iconFont="garage"
                clickFunc={recordMOT}
                submitting={isUpdating}
                submittingText="Recording..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select the new due date for this vehicle's MOT.</p>
                </GridItem>
                <GridItem title='MOT Due Date'>
                    <DateInput 
                        name="mot_due_date"
                        value={vehicleDetails.mot_due_date} 
                        label="MOT due date"
                        updateFunc={(date: Date, name: string) => updateStateDateParams(date, name, setVehicleDetails)} 
                        hasSubmitted={false}     
                        min={new Date()} 
                        max={getYearRelativeDate(new Date(), 1)}              
                    />
                </GridItem>
            </InfoGrid>

            
        </WindowOverlay>
    )
}

export default RecordMOT