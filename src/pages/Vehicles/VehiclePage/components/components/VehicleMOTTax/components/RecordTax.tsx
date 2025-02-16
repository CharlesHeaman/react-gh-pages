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

const RecordTax = (props: {
    vehicleID: number,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({
        tax_due_date: getYearRelativeDate(new Date(), 1),
    });
    
    const recordTax = () => {
        putAPI(`vehicles/${props.vehicleID}/record_tax`, {}, {
            tax_due_date: vehicleDetails.tax_due_date
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            props.setVehicleData(vehicleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Record Tax'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Record Tax"
                iconFont="fact_check"
                clickFunc={recordTax}
                submitting={isUpdating}
                submittingText="Recording..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select new due date for this vehicle's tax.</p>
                </GridItem>
                <GridItem title='Tax Due Date'>
                    <DateInput 
                        name="tax_due_date"
                        value={vehicleDetails.tax_due_date} 
                        label="Tax due date"
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

export default RecordTax