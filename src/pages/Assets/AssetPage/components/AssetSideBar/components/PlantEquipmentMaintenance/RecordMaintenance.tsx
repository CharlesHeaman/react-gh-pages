import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetResponseData } from "../../../../../../../types/asset.types";
import getYearRelativeDate from "../../../../../../../utils/getYearRelativeDate";
import putAPI from "../../../../../../../utils/putAPI";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import updateStateDateParams from "../../../../../../../utils/updateStateParams/updateStateDateParams";
import getMonthRelativeDate from "../../../../../../../utils/getMonthRelativeDate";

const RecordMaintenance = (props: {
    plantEquipmentID: number,
    maintenanceFrequency: number,
    show: boolean,
    hideFunc: () => void,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [patTestAttributes, setPatTestAttributes] = useState({
        last_maintenance: new Date()
    })
    
    const recordMaintenance = () => {
        putAPI(`assets/${props.plantEquipmentID}/record_maintenance`, {}, {
            next_maintenance: getMonthRelativeDate(patTestAttributes.last_maintenance, props.maintenanceFrequency)
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            props.setPlantEquipmentData(plantEquipmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title={"Record Maintenance"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Record Maintenance"} 
                color='light-green'
                iconFont="home_repair_service"
                submitting={isUpdating}
                submittingText="Recording..."
                clickFunc={recordMaintenance}  
            />}
        >
            <p>Select the previous maintenance date for this plant/tools.</p>
            <InfoGrid>
                <GridItem title='Maintenance Date'>
                    <DateInput
                        name="last_maintenance"
                        value={patTestAttributes.last_maintenance}
                        label="Maintenance date"
                        updateFunc={(date, name) => updateStateDateParams(date, name, setPatTestAttributes)}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default RecordMaintenance